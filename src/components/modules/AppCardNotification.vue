<template>
    <div id="App">
        <el-popover
            placement="bottom-end"
            width="250"
            trigger="click">
            <div class="width width-100">
                <AppEmpty />
            </div>
            <button 
                slot="reference"
                class="btn btn-white btn-icon btn-circle">
                <i class="icn fa fa-lw fa-bell"></i>
            </button>
        </el-popover>
    </div>
</template>
<script>
import AppEmpty from './AppEmpty'
export default {
    name: 'App',
    components: {
        AppEmpty
    }
}
</script>