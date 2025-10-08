<script setup lang="ts">
import { API_GetListPointName } from '~/api/pointAPI'
import { API_GetListRouteByCompany, API_GetRoutePoints, API_UpdateRoutePoints } from '~/api/routeAPI'
import type { PointNameType } from '~/types/pointType'
import type { RouteItemType } from '~/types/routeType'
import { Check, Loading } from '@element-plus/icons-vue'
definePageMeta({
    layout: 'admin',
})

const route = useRoute()
const id = route.query.id
const company_short_name = route.query.name || ''

const listRoute = ref<RouteItemType[]>([])
const pointsData = ref<PointNameType[]>([])
const loadingPointName = ref(false)
const loadingRoutes = ref(false)

// Tách hàm load points riêng để tái sử dụng
const loadRoutePoints = async (routeId: number): Promise<number[]> => {
    try {
        const response = await API_GetRoutePoints(routeId)
        if (response.success && response.result) {
            return response.result.map(item => item.point_id)
        }
        return []
    } catch (error) {
        console.error(`Error loading points for route ${routeId}:`, error)
        return []
    }
}

// Load selected points cho tất cả routes với xử lý lỗi từng route
const loadSelectedPointsForRoutes = async () => {
    if (listRoute.value.length === 0) return
    
    const promises = listRoute.value.map(async (routeItem) => {
        try {
            routeItem.selectedPoints = await loadRoutePoints(routeItem.id)
        } catch (error) {
            console.error(`Failed to load points for route ${routeItem.id}:`, error)
            routeItem.selectedPoints = []
        }
    })
    
    await Promise.allSettled(promises)
}

const fetchListRoute = async () => {
    try {
        loadingRoutes.value = true
        const response = await API_GetListRouteByCompany(id as string)
        if (response.success && response.result) {
            listRoute.value = response.result
        } else {
            ElMessage.error(response.message || 'Lỗi khi tải danh sách tuyến')
            listRoute.value = []
        }
    } catch (error) {
        console.error('Error fetching routes:', error)
        ElMessage.error('Lỗi khi tải danh sách tuyến')
        listRoute.value = []
    } finally {
        loadingRoutes.value = false
    }
}

const fetchListPointName = async () => {
    try {
        loadingPointName.value = true
        const response = await API_GetListPointName()
        if (response.success && response.result) {
            pointsData.value = response.result
        } else {
            ElMessage.error(response.message || 'Lỗi khi tải danh sách điểm')
            pointsData.value = []
        }
    } catch (error) {
        console.error('Error fetching points:', error)
        ElMessage.error('Lỗi khi tải danh sách điểm')
        pointsData.value = []
    } finally {
        loadingPointName.value = false
    }
}

const transferPointsData = computed(() =>
    pointsData.value.map(point => ({
        key: point.id,
        label: point.name,
    }))
)

// Kiểm tra tính hợp lệ của points trước khi submit
const validateRoutePoints = (selectedPoints: number[]): boolean => {
    if (!selectedPoints || selectedPoints.length === 0) {
        ElMessage.warning('Vui lòng chọn ít nhất một điểm cho tuyến này')
        return false
    }
    
    if (selectedPoints.length < 2) {
        ElMessage.warning('Tuyến phải có ít nhất 2 điểm')
        return false
    }
    
    // Kiểm tra tất cả point IDs có tồn tại trong pointsData không
    const validPointIds = new Set(pointsData.value.map(p => p.id))
    const invalidPoints = selectedPoints.filter(pointId => !validPointIds.has(pointId))
    
    if (invalidPoints.length > 0) {
        console.warn('Invalid point IDs detected:', invalidPoints)
        ElMessage.error('Có điểm không hợp lệ. Vui lòng tải lại trang và thử lại.')
        return false
    }
    
    return true
}

const handleSubmitRoute = async (routeItem: RouteItemType) => {
    if (!routeItem.selectedPoints || !validateRoutePoints(routeItem.selectedPoints)) {
        return
    }
    
    try {
        routeItem.isSubmitting = true
        const response = await API_UpdateRoutePoints(routeItem.id, routeItem.selectedPoints)
        
        if (response.success) {
            ElMessage.success('Cập nhật cấu hình tuyến thành công')
            // Reload points để đảm bảo đồng bộ
            routeItem.selectedPoints = await loadRoutePoints(routeItem.id)
        } else {
            ElMessage.error(response.message || 'Lỗi khi cập nhật cấu hình tuyến')
        }
    } catch (error) {
        console.error('Error updating route points:', error)
        ElMessage.error('Không thể kết nối đến server. Vui lòng thử lại sau.')
    } finally {
        routeItem.isSubmitting = false
    }
}

// Load tuần tự để đảm bảo thứ tự phụ thuộc
onMounted(async () => {
    try {
        // Đầu tiên load danh sách điểm
        await fetchListPointName()
        // Sau đó load routes và points của routes
        await fetchListRoute()
        await loadSelectedPointsForRoutes()
    } catch (error) {
        console.error('Error during initialization:', error)
        ElMessage.error('Có lỗi xảy ra khi khởi tạo dữ liệu')
    }
})
</script>
<template>
    <section>
        <h3 class="text-xl font-semibold flex items-center gap-2">
            Cấu hình tuyến -
            <el-tag type="primary">{{ company_short_name }}</el-tag>
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
            <div v-for="route in listRoute" :key="route.id"
                class="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
                :class="{ 'opacity-50': route.isSubmitting }">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-semibold text-base text-gray-700">{{ route.route_name }}</h4>
                    <el-tag :type="route.status ? 'success' : 'info'" size="small">
                        {{ route.status ? 'Hoạt động' : 'Không hoạt động' }}
                    </el-tag>
                </div>

                <div class="mt-2">
                    <el-transfer v-model="route.selectedPoints" :data="transferPointsData" filterable
                        :titles="['Điểm có sẵn', 'Điểm đã chọn']">
                        <template #left-footer>
                            <div v-if="loadingPointName"
                                class="absolute top-0 left-0 w-full h-full bg-white bg-opacity-70 flex items-center justify-center z-10">
                                <el-icon class="is-loading text-gray-500">
                                    <Loading />
                                </el-icon>
                            </div>
                        </template>
                    </el-transfer>
                </div>

                <div class="mt-3 flex justify-between items-center">
                    <span class="text-xs text-gray-500">
                        {{ route.selectedPoints?.length || 0 }} điểm đã chọn
                    </span>
                    <el-button 
                        type="primary" 
                        :loading="route.isSubmitting || false"
                        :disabled="!route.selectedPoints || route.selectedPoints.length === 0"
                        @click="handleSubmitRoute(route)"
                        size="small">
                        <el-icon v-if="!route.isSubmitting">
                            <Check />
                        </el-icon>
                        {{ route.isSubmitting ? 'Đang lưu...' : 'Lưu cấu hình' }}
                    </el-button>
                </div>
            </div>
        </div>
    </section>
</template>