<template>
    <div id="App">
        <div class="margin margin-bottom-20px">
            <div class="fonts fonts-13 black semibold">General Info</div>
            <div class="field-group">
                <div class="field-label">Role ID</div>
                <el-input 
                    placeholder=""
                    type="text"
                    v-model="form.role_id"
                    :disabled="true"></el-input>
                <div 
                    v-if="errorMessage.role_id" 
                    class="field-error">
                    {{ errorMessage.role_id && errorMessage.role_id[0] }}
                </div>
            </div>
            <div class="field-group">
                <div class="field-label">Role Name</div>
                <el-input 
                    placeholder=""
                    type="text"
                    v-model="form.role_name"
                    :disabled="isDetailForm"></el-input>
                <div 
                    v-if="errorMessage.role_name" 
                    class="field-error">
                    {{ errorMessage.role_name && errorMessage.role_name[0] }}
                </div>
            </div>
            <div class="field-group">
                <div class="field-label">Description</div>
                <el-input 
                    placeholder=""
                    type="textarea"
                    v-model="form.description"
                    :disabled="isDetailForm"
                    :autosize="{ minRows: 2, maxRows: 2}"></el-input>
                <div 
                    v-if="errorMessage.description" 
                    class="field-error">
                    {{ errorMessage.description && errorMessage.description[0] }}
                </div>
            </div>
        </div>
        <div class="margin margin-bottom-0px">
            <div class="fonts fonts-13 black semibold">Configuration</div>
            <div class="field-group">
                <div class="field-label">Status</div>
                <div class="display-flex space-between">
                    <div class="fonts micro black">Is this role still active ?</div>
                    <el-switch 
                        v-model="form.status"
                        :disabled="isDetailForm"
                        :active-value="'active'"
                        :inactive-value="'inactive'"></el-switch>
                </div>
                <div 
                    v-if="errorMessage.status" 
                    class="field-error">
                    {{ errorMessage.status && errorMessage.status[0] }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState({
            form: (state) => state.storeRoles.form,
            errorMessage: (state) => state.storeRoles.errorMessage,
            typeForm: (state) => state.storeRoles.typeForm,
        }),
        isDetailForm () {
            let status = false 
            if (this.typeForm === 'detail') {
                status = true 
            }
            return status
        },
    }    
}
</script>