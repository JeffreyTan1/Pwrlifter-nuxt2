<template>

<div class="px-[10%] py-16">
  <NavBar />

  <div class="max-w-[40rem] mx-auto mt-20">
      <div class="h-30 flex gap-16 items-center w-auto">
        <a @click="goBack" class="cursor-pointer">
          <font-awesome-icon class="text-white text-3xl" icon="arrow-left"/>
        </a>
        <h1 class="text-4xl font-bold sm:text-6xl">Profile</h1>
      </div>

      <div class="flex flex-wrap items-center mt-10 justify-between">
        <label for="image" class="text-2xl font-bold">Profile Picture</label>
        <input ref="image" id="image" type="file" class="text-white" accept="image/png" @change="onFileChange"/>
      </div>

      <img width="320" height="320" :src="imagePath" class="mt-10"/>
      
      <div v-if="presignedPost" class="flex justify-end mt-10 flex-col">
        <button class="py-2 px-3.5 bg-red inline text-s font-bold min-w-[6rem] text-center" @click="upload">
          {{ isUploading ? 'Uploading...' : 'Upload' }}
        </button>
        <h2 v-if="presignedPost">Please note it may take up to 5 minutes before your profile is updated with new content.</h2>
      </div>
    </div>


</div>



</template>

<script>

export default {
  mounted() {
  },
  data() {
    return {
      imagePath: null,
      presignedPost: null,
      isUploading: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    onFileChange(e) {
      const file = e.target.files[0]

      if(file.size > 	5000000) {
        alert('File Too Large. Maximum size = 5MB')
        this.$refs.image.value = ''
        this.imagePath = null
        this.presignedPost = null
      }
      else {
        const path = (window.URL || window.webkitURL).createObjectURL(file);
        this.imagePath = path
        this.$axios.$post('https://rz7wshkfyh.execute-api.ap-southeast-2.amazonaws.com/prod/presigned-url/image',
          {
           
          },
          {
            headers: {
              Authorization: this.$store.state.auth.token,
            }
          }
        ).catch(
          (err) => {
            console.error(err)
          }
        ).then(
          (res) => {
            //console.info(res)
            this.presignedPost = res
          }
        )
      }
      
    },

    async upload() {
      this.isUploading = true

      const file = this.$refs.image.files[0]
      const formData = new FormData()
      formData.append('Content-Type', file.type)
      Object.entries(this.presignedPost.fields).forEach(([key, value]) => {
        formData.append(key, value)
      })
      formData.append('file', file)

      fetch(this.presignedPost.url,
      {
        method: "POST",
        body: formData,
        headers: {
          host: process.env.baseUrl,
          Origin: process.env.baseUrl,
        }
      }).catch(
        (e) => console.error(e)
      ).then (
        (res) => {
          // console.info(res)
        }
      ).finally(
        () => {
          this.isUploading = false
        }
      )
      
    },

  },
}

</script>
