<script setup lang="ts">
interface MenuItem {
    index: string;
    title: string;
    path?: string; // đường dẫn điều hướng
    disabled?: boolean;
    children?: MenuItem[];
}

const menuItems: MenuItem[] = [
    {
        index: "2",
        title: "Danh sách ",
        path: "/admin/companies"
    },
    {
        index: "3",
        title: "Danh sách ",
        path: "/admin/companies"
    },
    {
        index: "1",
        title: "Nhà xe",
        children: [
            {
                index: "1-1",
                title: "Danh sách nhà xe",
                path: "/admin/companies"
            },
            {
                index: "1-2",
                title: "Điểm dừng",
                path: "/admin/points"
            },
            {
                index: "1-3",
                title: "Item Three",
                path: "/item-three"
            },
            {
                index: "1-4",
                title: "Item Four",
                children: [
                    {
                        index: "1-4-1",
                        title: "Item One",
                        path: "/item-four-one"
                    }
                ]
            }
        ]
    },
    
    {
        index: "3",
        title: "Navigator Three",
        disabled: true
    },
    {
        index: "4",
        title: "Navigator Four",
        path: "/navigator-four"
    }
];
const router = useRouter();

const handleMenuSelect = (index: string) => {
    const findItem = (items: MenuItem[], idx: string): MenuItem | undefined => {
        for (const item of items) {
            if (item.index === idx) return item;
            if (item.children) {
                const child = findItem(item.children, idx);
                if (child) return child;
            }
        }
        return undefined;
    };

    const item = findItem(menuItems, index);
    if (item?.path) {
        router.push(item.path);
    }
};
</script>
<template>
    <div>
        <el-menu default-active="2" class="el-menu-vertical-demo" @select="handleMenuSelect">
            <template v-for="item in menuItems" :key="item.index">
                <el-sub-menu v-if="item.children" :index="item.index">
                    <template #title>
                        <span>{{ item.title }}</span>
                    </template>
                    <template v-for="child in item.children" :key="child.index">
                        <el-menu-item-group v-if="child.children" :title="child.title">
                            <template v-for="grand in child.children" :key="grand.index">
                                <el-menu-item :index="grand.index">{{ grand.title }}</el-menu-item>
                            </template>
                        </el-menu-item-group>
                        <el-menu-item v-else :index="child.index" :disabled="child.disabled">{{ child.title
                            }}</el-menu-item>
                    </template>
                </el-sub-menu>

                <el-menu-item v-else :index="item.index" :disabled="item.disabled">
                    <span>{{ item.title }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>