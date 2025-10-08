<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { API_CreatePoint, API_UpdatePoint, API_DeletePoint, API_GetListPoint, API_GetListProvince, API_GetListWard } from '~/api/pointAPI'
import type { ProvinceType, PointType, WardType } from '~/types/pointType'


definePageMeta({
    layout: 'admin',
})
const modeEdit = ref(false)
const dialogVisible = ref(false)

const ruleFormRef = ref<FormInstance>()
const ruleForm = ref<PointType>({
    id: null,
    name: null,
    short_name: null,
    province_code: null,
    ward_code: null,
    address: null,
})
const loadingPoint = ref(false);
const data = ref<PointType[]>([]);
const search = ref('')
const filterTableData = computed(() =>
    data.value.filter(
        (data: PointType) =>
            !search.value ||
            data.name?.toLowerCase().includes(search.value.toLowerCase()) ||
            data.short_name?.toLowerCase().includes(search.value.toLowerCase())
    )
)
const fetchPoints = async () => {
    loadingPoint.value = true;
    try {
        const response = await API_GetListPoint();
        if (response.success) {
            data.value = response.result || [];
        } else {
            ElMessage.error(response.message || 'Lỗi khi tải danh sách điểm dừng');
        }
    } catch (error) {
        console.error('Error fetching points:', error);
        ElMessage.error('Lỗi khi tải danh sách điểm dừng');
    } finally {
        loadingPoint.value = false;
    }
}
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            try {
                let response;
                if (modeEdit.value) {
                    // sửa
                    response = await API_UpdatePoint(ruleForm.value);
                    if (response.success) {
                        ElMessage.success('Cập nhật điểm dừng thành công');
                        const index = data.value.findIndex(item => item.id === ruleForm.value.id);
                        if (index !== -1 && response.result) {
                            data.value[index] = response.result;
                        }
                        handleClose();
                    } else {
                        ElMessage.error(response.message || 'Lỗi khi cập nhật điểm dừng');
                    }
                } else {
                    // thêm mới
                    response = await API_CreatePoint(ruleForm.value);
                    if (response.success) {
                        ElMessage.success('Lưu điểm dừng thành công');
                        if (response.result) {
                            data.value.push(response.result);
                        }
                        handleClose();
                    } else {
                        ElMessage.error(response.message || 'Lỗi khi lưu điểm dừng');
                    }
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                ElMessage.error(modeEdit.value ? 'Lỗi khi cập nhật điểm dừng' : 'Lỗi khi lưu điểm dừng');
            }
        } else {
            console.log('error submit!')
        }
    })
}
const handleClose = () => {
    dialogVisible.value = false
    modeEdit.value = false
    ruleFormRef.value?.clearValidate()
    optionsWards.value = []
    ruleForm.value = {
        id: null,
        name: null,
        short_name: null,
        province_code: null,
        ward_code: null,
        address: null,
    }
}
const loadingProvinces = ref(false);
const optionsProvinces = ref<ProvinceType[]>([]);
const fetchProvinces = async () => {
    loadingProvinces.value = true;
    try {
        const response = await API_GetListProvince();
        if (response.success) {
            optionsProvinces.value = response.result || [];
        } else {
            ElMessage.error(response.message || 'Lỗi khi tải danh sách tỉnh/thành phố');
        }
    } catch (error) {
        console.error('Error fetching provinces:', error);
        ElMessage.error('Lỗi khi tải danh sách tỉnh/thành phố');
    } finally {
        loadingProvinces.value = false;
    }
}
const loadingWards = ref(false);
const optionsWards = ref<WardType[]>([]);
const fetchWards = async (provinceCode: number, preserveWardCode = false) => {
    loadingWards.value = true;
    optionsWards.value = [];
    if (!preserveWardCode) {
        ruleForm.value.ward_code = null
    }
    try {
        const response = await API_GetListWard(provinceCode);
        if (response.success) {
            optionsWards.value = response.result || [];
        } else {
            ElMessage.error(response.message || 'Lỗi khi tải danh sách phường/xã');
        }
    } catch (error) {
        console.error('Error fetching wards:', error);
        ElMessage.error('Lỗi khi tải danh sách phường/xã');
    } finally {
        loadingWards.value = false;
    }
}

const openDialog = async () => {
    dialogVisible.value = true;
    if (optionsProvinces.value.length === 0) {
        await fetchProvinces();
    }
}
watch(
    () => ruleForm.value.province_code,
    async (newProvinceCode) => {
        if (newProvinceCode) {
            await fetchWards(newProvinceCode, modeEdit.value)
        } else {
            optionsWards.value = []
            ruleForm.value.ward_code = null
        }
    }
)
const handleDelete = (row: PointType) => {
    ElMessageBox.confirm(
        `Bạn có chắc chắn muốn xóa điểm dừng "${row.name}"?`,
        'Xác nhận xóa',
        {
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
            type: 'warning',
        }
    ).then(async () => {
        const response = await API_DeletePoint(row.id!);
        if (response.success) {
            data.value = data.value.filter((point) => point.id !== row.id);
            ElMessage({
                type: 'success',
                message: 'Xóa điểm dừng thành công!',
            });
        } else {
            ElMessage.error(response.message || 'Lỗi khi xóa điểm dừng');
        }
    }).catch(() => {
        // Hủy xóa
    });
}
const handleEdit = (row: PointType) => {
    modeEdit.value = true;
    ruleForm.value = { ...row };
    dialogVisible.value = true;
    if (optionsProvinces.value.length === 0) {
        fetchProvinces();
    }
}
onMounted(async () => {
    await fetchPoints();
})
</script>
<template>
    <section>
        <h3 class="text-base font-semibold">Danh sách điểm dừng</h3>
        <div class="mt-3">
            <el-button plain @click="openDialog">
                Thêm điểm dừng
            </el-button>
        </div>
        <el-table v-loading="loadingPoint" :data="filterTableData" style="width: 100%">
            <el-table-column type="index" label="STT" width="50" />
            <el-table-column prop="name" label="Tên điểm dừng" />
            <el-table-column prop="short_name" label="Tên rút gọn" />
            <el-table-column prop="address" label="Địa chỉ" />
            <el-table-column prop="province_name" label="Tỉnh/Thành phố" />
            <el-table-column prop="ward_name" label="Phường/Xã" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="Tìm kiếm" />
                </template>
                <template #default="scope">
                    <el-button type="text" size="small" @click="handleEdit(scope.row)">Chỉnh sửa</el-button>
                    <el-button type="text" size="small" @click="handleDelete(scope.row)">Xóa</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="dialogVisible"  width="500" :before-close="handleClose">
            <template #title>
                <span>{{ modeEdit ? 'Chỉnh sửa điểm dừng' : 'Thêm điểm dừng' }}</span>
            </template>
            <div>
                <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon label-width="auto"
                    class="demo-ruleForm">
                    <el-form-item label="Tên điểm dừng" prop="name" label-position="top">
                        <el-input v-model="ruleForm.name" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="Tên viết tắt" prop="short_name" label-position="top">
                        <el-input v-model="ruleForm.short_name" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="Tỉnh/Thành phố" prop="province" label-position="top">
                        <el-select v-model="ruleForm.province_code" filterable clearable
                            placeholder="Chọn tỉnh/thành phố" style="width: 100%;">
                            <el-option v-if="loadingProvinces" label="Đang tải dữ liệu..." value="" disabled />
                            <el-option v-else v-for="item in optionsProvinces" :key="item.id" :label="item.name"
                                :value="item.code" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Phường/Xã" prop="ward" label-position="top">
                        <el-select v-model="ruleForm.ward_code" filterable clearable placeholder="Chọn phường/xã"
                            style="width: 100%;">
                            <el-option v-if="loadingWards" label="Đang tải dữ liệu..." value="" disabled />
                            <el-option v-else v-for="item in optionsWards" :key="item.id" :label="item.name"
                                :value="item.code" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Địa chỉ" prop="address" label-position="top">
                        <el-input v-model="ruleForm.address" autocomplete="off" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="handleClose">Thoát</el-button>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        Lưu
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </section>
</template>