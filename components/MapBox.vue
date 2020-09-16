<template>
  <div class="asc__su-googleMap">
    <div v-for="(row, i) in getdata" :key="i">
      <b-row v-for="(map, x) in JSON.parse(row.map)" :key="'map' + x">
        <b-col cols="12">
          <h3>{{ map.where }}</h3>
          <div class="addressbox" v-html="map.address" />
        </b-col>
        <b-col cols="12" md="4">
          <div class="asc__su-googleMap-list">
            <h4>
              {{ map.nearby }}
            </h4>
            <ul>
              <li v-for="(m, mi) in map.universities" :key="'m'+mi">
                {{ m.uni }}
              </li>
            </ul>
          </div>
        </b-col>
        <b-col cols="12" md="8">
          <div class="asc__su-googleMap-map">
            <GMap
              ref="gMap"
              language="en"
              :center="{lat: parseFloat(map.coordinate_x), lng: parseFloat(map.coordinate_y)}"
              :options="{fullscreenControl: false, styles: mapStyle}"
              :zoom="18"
            >
              <GMapMarker
                :position="{lat: parseFloat(row.coordinate_x), lng: parseFloat(row.coordinate_y), zoom: row.coordinate_z}"
              >
                <GMapInfoWindow :options="{maxWidth: 250}">
                  <code>
                    lat: {{ parseFloat(row.coordinate_x) }},
                    lng: {{ parseFloat(row.coordinate_y) }}
                  </code>
                </GMapInfoWindow>
              </GMapMarker>
            </GMap>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    getdata: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      currentLocation: {},
      pins: {
        selected:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHUSURBVHgB5VU7SwNBEJ7LmZBgMC+UdKKx0MZCG2srwcbCB2glpFDQ3to/IegvSAIWPrBJIySlipUKKqYLaHJ3iWIelzu/DTk8j71H7MQPltmZnflmZ3b3juivQ3BzCIfDI4FAYBvTRV3XR7tBglCCOIP9oFwuv/46QSwWWwfZIaaDNi7vGOlqtZqhfhPE4/EViAy5V6ljE8uVSuXYc4JkMjncarUeMR0ib5Db7fZEvV6vWBd8PG+Q73LIFYyj3lAsa1G/37/D4+JWgPbcQkybd9jpdGYVRXlmSiQSSYmieMWmhgMuwI0kSTPkpQJgzKJnDfJuKYryBJH7sVNBSPGI7BKoFl3n+GguMY4JHiz6GtoybiisRczmEtPFAM+Ifl6i5DmTKYqeX+Nssj19lUz9N2J4XNxDTiQSkwi4oz6ADU3hLdxb7dwW9RyL5B0FHrltAgZUsEce4eRrmwB3ugCRJ3fk4VvsOwEDHtcWxKeDy4emaWmHdRKdFpvNphQKhdhFmOet42D3sftTJw7X/wHgw/U8h1ywkJ/gYJeI/wi/g8kdmqqqG5Alk62Er+emG7nXBFSr1aroNSNknwOVzZnNS6xIHtFoNF6CweAbpheyLOfo3+ALfrSuzJ1F8EsAAAAASUVORK5CYII=',
        notSelected:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABHElEQVR42uVVyw4BMRQdC98lsbPwG5YSH+BzWFtLZilh0oQgFh6J54IwBmGYtrfaBREdcTvDhpM0adrec3rb+7Csn8fRdrLg7VzBubhDzmHrudRuZ2KRs/miLd6AThfNaOTTGRFIsMm8bkSuXBeGoLVaGi0g39wLI4GTf1EjdE/+E1pAAGgEAenkb/tBo1vQFUDgBbSbny6al77uSQwB/6wJSNHoAo8xj30iaYMW4Lv9wfSTpc0eH6atXtE4TKWNUS4AY2hyddY4k/lwVEZncm9QilQuBGPwnp1B5GIXGi3P0eU0c7EqKrje5hU5d7fr2P2AEJIESkNqB1XJkvhI0/GrTuqZX619tLMF/VHlfnk5/0r7ZMvVWA3rr3AF6LIMZ7PmSlUAAAAASUVORK5CYII='
      },
      mapStyle: [],
      clusterStyle: [
        {
          url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
          width: 56,
          height: 56,
          textColor: '#fff'
        }
      ],
      contact: [],
      address: []
    }
  },
  computed: mapState(['settings', 'navigation', 'authUser']),
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="sass">
  .asc__su-googleMap
    position: relative
    & h3
      color: #000
      font-size: 2em
      letter-spacing: -1px
      font-weight: 900
      font-style: italic
      font-family: 'Raleway', sans-serif
    .asc__su-googleMap-map
      width: 100%
      .GMap__Wrapper
        width: 100%
        height: 250px
        margin-bottom: 3rem !important
    .asc__su-googleMap-list
      & h4
        font-style: italic
        font-family: 'Raleway', sans-serif
        margin-top: 20px
      & ul
        list-style: none
        font-style: italic
        font-family: 'Raleway', sans-serif
        padding: 0
    .addressbox
      font-family: 'Raleway', sans-serif
      border-top: 1px #ddd solid
      & h5
        margin: 10px 0
      & p
        padding: 0px
        margin: 10px 0px 0px 0px
        & a
          color: #000
          text-decoration: underline
</style>
