<template>

<div class="px-[10%] py-16">
  <NavBar />

    <div class="max-w-[40rem] mx-auto mt-20">
      <div class="h-30 flex gap-16 items-center w-auto">
        <a @click="goBack" class="cursor-pointer">
          <font-awesome-icon class="text-white text-3xl" icon="arrow-left"/>
        </a>
        <h1 class="text-4xl font-bold sm:text-6xl">{{capLift}}</h1>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-10 mt-16">
        <label for="weight" class="text-2xl font-bold">Weight</label>
        <input type="number" id="weight" v-model="weight" class="px-3 py-2 rounded-xl text-lg outline-none w-80"/>
      </div>
      <div class="flex flex-wrap items-center mt-10 justify-between gap-10">
        <label for="unit" class="text-2xl font-bold">Unit</label>
        <select name="unit" id="unit" v-model="unit" class="px-3 py-2 rounded-xl w-80 outline-none text-lg">
          <option>kg</option>
          <option>lbs</option>
        </select>
      </div>

      <div class="flex justify-end mt-10">
        <button class="py-2 px-3.5 bg-red inline text-s font-bold min-w-[6rem] text-center" @click="save">
          {{ saved ? 'Saved' : 'Save' }}
        </button>
      </div>

      <div class="flex flex-wrap items-center mt-10 justify-between">
        <label for="video" class="text-2xl font-bold">Video</label>
        <input ref="video" id="video" type="file" class="text-white" accept="video/mp4" @change="onFileChange"/>
      </div>

      <video class="mx-auto mt-10" width="320" height="600" controls :src="videoPath"/>
      
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
    const routeSplit = this.$route.path.split('/')
    let param = routeSplit[routeSplit.length - 1]
    this.lift = param
  },
  data() {
    return {
      lift: null,
      weight: 0,
      unit: 'kg',
      saved: false,
      videoPath: null,
      presignedPost: null,
      isUploading: false,
    }
  },
  computed: {
    capLift(){
      return this.lift ? this.lift.charAt(0).toUpperCase() + this.lift.slice(1) : ''
    },
    user() {
      return this.$store.state.auth.user
     
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    save() {
      this.$axios.$put(`https://rz7wshkfyh.execute-api.ap-southeast-2.amazonaws.com/prod/update`,
        {
          action: this.lift,
          payload: {
            weight: this.weight,
            unit: this.unit,
          },
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
          console.info(res)
          this.saved = true
        }
      )
    },
    onFileChange(e) {
      const file = e.target.files[0]

      if(file.size > 	100000000) {
        alert('File Too Large. Maximum size = 100MB')
        this.$refs.video.value = ''
        this.videoPath = null
        this.presignedPost = null
      }
      else {
        const path = (window.URL || window.webkitURL).createObjectURL(file);
        this.videoPath = path
        this.$axios.$post('https://rz7wshkfyh.execute-api.ap-southeast-2.amazonaws.com/prod/presigned-url',
          {
            action: this.lift,
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

      const file = this.$refs.video.files[0]
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
