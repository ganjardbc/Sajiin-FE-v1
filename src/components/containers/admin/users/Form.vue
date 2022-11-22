<template>
    <div id="App">
        <AppSideForm 
            :title="title" 
            :enableSaveButton="!isDetailForm"
            :onSave="onSave"
            :onClose="onClose">
            <div class="margin margin-bottom-20px">
                <div class="fonts fonts-13 black semibold">General Info</div>
                <div class="field-group">
                    <div class="field-label">Cover</div>
                    <div class="width width-80px">
                        <div class="image image-padding border border-full">
                            <img 
                                v-if="form.image" 
                                :src="getCover" 
                                alt="" 
                                class="post-center">
                            <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                        </div>
                    </div>
                </div>
                <div class="field-group">
                    <div class="field-label">User ID</div>
                    <el-input 
                        placeholder=""
                        type="text"
                        v-model="form.id"
                        :disabled="true"></el-input>
                    <div 
                        v-if="errorMessage.id" 
                        class="field-error">
                        {{ errorMessage.id && errorMessage.id[0] }}
                    </div>
                </div>
                <div class="field-group">
                    <div class="field-label">Role</div>
                    <el-select 
                        v-model="form.role_id" 
                        placeholder="Select"
                        no-data-text="No Data Disaplayed"
                        :disabled="isDetailForm">
                        <el-option
                            v-for="(item, i) in roleData"
                            :key="i"
                            :label="item.role_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <div 
                        v-if="errorMessage.role_id" 
                        class="field-error">
                        {{ errorMessage.role_id && errorMessage.role_id[0] }}
                    </div>
                </div>
                <div class="field-group">
                    <div class="field-label">Name</div>
                    <el-input 
                        placeholder=""
                        type="text"
                        v-model="form.name"
                        :disabled="isDetailForm"></el-input>
                    <div 
                        v-if="errorMessage.name" 
                        class="field-error">
                        {{ errorMessage.name && errorMessage.name[0] }}
                    </div>
                </div>
                <div class="field-group">
                    <div class="field-label">Email</div>
                    <el-input 
                        placeholder=""
                        type="email"
                        v-model="form.email"
                        :disabled="isDetailForm"></el-input>
                    <div 
                        v-if="errorMessage.email" 
                        class="field-error">
                        {{ errorMessage.email && errorMessage.email[0] }}
                    </div>
                </div>
                <div class="field-group">
                    <div class="field-label">Username</div>
                    <el-input 
                        placeholder=""
                        type="text"
                        v-model="form.username"
                        :disabled="true"></el-input>
                    <div 
                        v-if="errorMessage.username" 
                        class="field-error">
                        {{ errorMessage.username && errorMessage.username[0] }}
                    </div>
                </div>
                <div class="field-group">
                    <div class="field-label">Password</div>
                    <div class="field-caption">Fill this password to change or create new password</div>
                    <el-input 
                        placeholder=""
                        type="password"
                        v-model="form.password"
                        :disabled="isDetailForm"
                        show-password></el-input>
                    <div 
                        v-if="errorMessage.password" 
                        class="field-error">
                        {{ errorMessage.password && errorMessage.password[0] }}
                    </div>
                </div>
            </div>
            <div class="margin margin-bottom-0px">
                <div class="fonts fonts-13 black semibold">Configuration</div>
                <div class="field-group">
                    <div class="field-label">Status</div>
                    <div class="display-flex space-between">
                        <div class="fonts micro black">Is this user still active ?</div>
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
                <div class="field-group">
                    <div class="field-label">Available</div>
                    <div class="display-flex space-between">
                        <div class="fonts micro black">Is this user still available ?</div>
                        <el-switch 
                            v-model="form.is_available"
                            :disabled="isDetailForm"
                            :active-value="1"
                            :inactive-value="0"></el-switch>
                    </div>
                    <div 
                        v-if="errorMessage.is_available" 
                        class="field-error">
                        {{ errorMessage.is_available && errorMessage.is_available[0] }}
                    </div>
                </div>
            </div>
        </AppSideForm>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import AppSideForm from '../../../modules/AppSideForm'
import AppImage from '../../../modules/AppImage'

export default {
    name: 'App',
    data () {
        return {}
    },
    mounted () {},
    computed: {
        ...mapState({
            form: (state) => state.storeUsers.form,
            errorMessage: (state) => state.storeUsers.errorMessage,
            typeForm: (state) => state.storeUsers.typeForm,
            roleData: (state) => state.storeUsers.role.data,
        }),
        title () {
            let currentTitle = ''
            switch (this.typeForm) {
                case 'create':
                    currentTitle = 'Create User'
                    break
                case 'detail':
                    currentTitle = 'Detail User'
                    break
                case 'edit':
                    currentTitle = 'Edit User'
                    break
            }
            return currentTitle
        },
        isDetailForm () {
            let status = false 
            if (this.typeForm === 'detail') {
                status = true 
            }
            return status
        },
        getCover () {
            return this.form.image ? this.adminImageThumbnailUrl + this.form.image : ''
        }
    },
    components: {
        AppSideForm,
        AppImage,
    },
    methods: {
        uploadImage (data) {
            this.$emit('uploadImage', data)
        },
        removeImage (data) {
            this.$emit('removeImage', data)
        },
        onSave () {
            this.$emit('onSave')
        },
        onClose () {
            this.$emit('onClose')
        },
    },
}
</script>