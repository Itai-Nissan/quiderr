<template>
  <div
    class="main-filter-container flex space-between"
    :class="{ scrolled: isFilterSticky }"
  >
    <div>
      <div class="filter-nav">
        <div class="filter-nav-home">
          <a href="/">QUIDERR</a>
          <p>></p>
        </div>
        <div
          v-if="gigParams"
          class="filter-nav-category"
        >
          <a href="/">{{ capGigParams }}</a>
          <p>></p>
        </div>
      </div>
      <div class="filter-results">
        <h1 v-if="currFilter">
          results for "{{ currFilter }}"
        </h1>
        <h1 v-if="!currFilter">
          All categories
        </h1>
        <p>Find a developer to improve your WordPress site or build one from scratch</p>
      </div>
      <div
        class="filter-and-sort-selects"
        :class="{ scrolled: isFilterSticky }"
      >
        <div class="inner-filters">
          <div class="filter-container flex align-end">
            <div class="filter-delivery">
              <el-select
                v-model="filter.delivery"
                name="x"
                @change="setFilterBy"
              >
                <el-option value="Delivery">
                  Delivery
                </el-option>
                <el-option value="1">
                  Express 24H
                </el-option>
                <el-option value="3">
                  Up to 3 days
                </el-option>
                <el-option value="7">
                  Up to 7 days
                </el-option>
              </el-select>
            </div>
            <div class="filter-budget">
              <el-select placeholder="Budget">
                <el-option
                  hidden
                  value=""
                />
                <section class="filter-min-max">
                  <div class="filter-min-max-container">
                    <div class="filter-min-container">
                      <label for="min">Min:</label>
                      <input
                        id="min"
                        v-model.number="filter.price.min"
                        onfocus="this.value=''"
                      >
                    </div>
                    <div class="filter-max-container">
                      <label for="max">Max:</label>
                      <input
                        id="max"
                        v-model.number="filter.price.max"
                        onfocus="this.value=''"
                      >
                    </div>
                  </div>
                  <div class="filter-min-max-btns">
                    <button class="filter-close-btn">
                      Close
                    </button>
                    <el-button
                      class="min-max-apply"
                      @click="setFilterBy"
                    >
                      Apply
                    </el-button>
                  </div>
                </section>
              </el-select>
            </div>
          </div>
        </div>
        <div
          v-if="gigs"
          class="sort-price"
        >
          <span>{{ gigs.length }} services available</span>
          <div class="sort-price-select">
            <p>Sort by</p>
            <div class="sort-price-input">
              <el-select
                v-model="filter.sortBy"
                placeholder="Best Selling"
                @change="setFilterBy"
              >
                <el-option
                  v-for="item in sortOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GigFilter',
  data() {
    return {
      // gigParams: null,
      gigParams: this.$route.query.search,
      filter: {
        txt: '',
        // inStock: 'All',
        type: '',
        delivery: 'Delivery',
        price: {
          min: 0,
          max: null,
        },
        sortBy: null,
      },
      labels: [
        'On wheels',
        'Box game',
        'Art',
        'Baby',
        'Doll',
        'Puzzle',
        'Outdoor',
      ],
      typeOptions: [
        {
          value: 'All',
          label: 'All',
        },
        {
          value: 'design',
          label: 'design',
        },
        {
          value: 'web-dev',
          label: 'web-dev',
        },
        {
          value: 'marketing',
          label: 'marketing',
        },
        {
          value: 'writing',
          label: 'writing',
        },
        {
          value: 'video',
          label: 'video',
        },
        {
          value: 'audio',
          label: 'audio',
        },
      ],
      sortOptions: [
        {
          value: 'title',
          label: 'title',
        },
        {
          value: 'price',
          label: 'price',
        },
      ],
      stockOptions: [
        {
          value: 'All',
          label: 'all',
        },
        {
          value: true,
          label: 'inStock',
        },
        {
          value: false,
          label: 'outStock',
        },
      ],
      isFilterSticky: false,
    }
  },
  computed: {
    capGigParams() {
      return this.gigParams.toUpperCase()
    },
    gigs() {
      return this.$store.getters.gigsToShow
    },
    currFilter() {
      return this.$store.getters.filterToShow
    },
  },
  created() {
    this.filter.txt = this.gigParams
    // console.log(this.filter.txt)
    this.setFilterBy()


    window.addEventListener("scroll", this.makeFilterSticky);
  },
  unmounted() {
  },
  methods: {
    onSetDeliveryFilter() {
    },
    search() {
      if (this.filter.type === 'All') {
        this.$router.push(`/explore`)
        this.gigParams = null
      } else {
        this.gigParams = this.filter.type
        this.$router.push(`/explore?search=${this.filter.type}`)
      }
    },
    setFilterBy() {
      var filter = this.filter;
      // console.log('setFilterBy', filter);
      this.$store.commit({
        type: 'setFilterBy',
        filterBy: JSON.parse(JSON.stringify(filter)),
      })
      this.gigParams = this.$route.query.search
      this.$store.dispatch('loadGigs')
    },
    setSortBy() {
      var sortBy = this.sortBy
      this.$store.dispatch({
        type: 'onSortBy',
        sortBy: JSON.parse(JSON.stringify(sortBy)),
      })
    },
    makeFilterSticky() {
      // console.log(window.scrollY);
      if (window.scrollY > 270) {
        this.isFilterSticky = true
      } else {
        this.isFilterSticky = false
      }
    },
  },
}
</script>

<style>

</style>
