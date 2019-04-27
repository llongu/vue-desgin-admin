const err = error => {

    // if (error.response) {
    //   const data = error.response.data;
    //   const token = Vue.ls.get(ACCESS_TOKEN);
    //   if (error.response.status === 403) {
    //     this.$notification.error({ message: 'Forbidden', description: data.message });
    //   }
    //   if (error.response.status === 401) {
    //     notification.error({
    //       message: 'Unauthorized',
    //       description: 'Authorization verification failed'
    //     });
    //     if (token) {
    //       store.dispatch('Logout').then(() => {
    //         setTimeout(() => {
    //           window.location.reload();
    //         }, 1500);
    //       });
    //     }
    //   }
    // }