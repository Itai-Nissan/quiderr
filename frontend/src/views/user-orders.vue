<template>
  <section class="user-main-container">
    <div class="user-main-wrapper">
      <div class="user-orders-container">
        <h1>User orders</h1>
        <user-avatar />
        <section class="info-col">
          <div class="seller-card-container">
            <div class="seller-card">
              <div class="profile-info" />
            </div>
          </div>
        </section>
        <section class="gigs-col" />
      </div>
    </div>
  </section>
</template>

<script>
import userAvatar from '../components/user/user-avatar.cmp.vue'
export default {
  name: 'UserOrders',
  components: { userAvatar },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {},
}
</script>
