<script setup lang="ts">
import { API_GetListBusCompany } from '~/api/companyAPI';
import type { CompanyType } from '~/types/companyType';
import { User, More, CirclePlus, Guide, Check, CircleCheck, ArrowDown } from '@element-plus/icons-vue';
definePageMeta({
    layout: 'admin',
})
const tableData = ref<CompanyType[]>([]);
const search = ref('')
const filterTableData = computed(() =>
    tableData.value.filter(
        (data: CompanyType) =>
            !search.value ||
            data.company_name.toLowerCase().includes(search.value.toLowerCase()) ||
            data.company_short_name.toLowerCase().includes(search.value.toLowerCase())
    )
)
const loading = ref(false);
const fetchListCompany = async () => {
    loading.value = true;
    try {
        const response = await API_GetListBusCompany();
        if (response.success) {
            console.log('Company List:', response.result);
            if (response.result) {
                tableData.value = response.result;
            }
        } else {
            ElMessage.error(response.message || 'Lỗi khi tải danh sách công ty');
        }
    } catch (error) {
        console.error('Error fetching companies:', error);
        ElMessage.error('Lỗi khi tải danh sách công ty');
    } finally {
        loading.value = false;
    }
};
const handleToRoutePage = (index: number, row: CompanyType) => {
    console.log(index, row)
    navigateTo({
        path: '/admin/companies/route',
        query: {
            id: row.id,
            name: row.company_short_name,
        },
    })

}
const handleDelete = (index: number, row: CompanyType) => {
    console.log(index, row)
}
onMounted(async () => {
    await fetchListCompany();
});
</script>
<template>
    <section>
        <el-table v-loading="loading" :data="filterTableData" style="width: 100%">
            <el-table-column type="index" label="STT" width="50" />
            <el-table-column label="Thông tin công ty">
                <template #default="scope">
                    <div>
                        <div style="font-weight: 600; font-size: 14px;">{{ scope.row.company_name }}</div>
                        <div style="color: #888; font-size: 12px;">{{ scope.row.company_short_name }} ({{
                            scope.row.company_code }})</div>
                        <div><strong>GPKD:</strong> {{ scope.row.business_license_number }}</div>
                        <div><strong>MST:</strong> {{ scope.row.tax_code }}</div>
                        <div>
                            <el-tag :type="scope.row.status ? 'success' : 'info'" size="small">
                                {{ scope.row.status ? 'Hoạt động' : 'Ngừng hoạt động' }}
                            </el-tag>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="Thông tin liên hệ">
                <template #default="scope">
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        <div><strong>Người đại diện:</strong> {{ scope.row.legal_representative }}</div>
                        <div><strong>Điện thoại:</strong> {{ scope.row.phone }}</div>

                        <div><strong>Email:</strong> {{ scope.row.email }}</div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="Thông tin ngân hàng">
                <template #default="scope">
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        <div><strong>Ngân hàng:</strong> {{ scope.row.bank_name }}</div>
                        <div><strong>Chủ tài khoản:</strong> {{ scope.row.bank_account_name }}</div>
                        <div><strong>Số tài khoản:</strong> {{ scope.row.bank_account_number }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="Tìm kiếm công ty" />
                </template>
                <template #default="scope">
                    <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                        Edit
                    </el-button> -->
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <el-button :icon="More" circle />
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item :icon="User">Tài khoản</el-dropdown-item>
                                <el-dropdown-item :icon="Guide"
                                    @click="handleToRoutePage(scope.$index, scope.row)">Tuyến</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>