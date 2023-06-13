<template>
    <div class="copyright">
        <div v-if="!isMobile">
            <p>Copyright ©{{year}} Major Global Marketing Company Limited | powered by Eventizer </p>

            <a target="_blank" href="https://eventizer.hk/">
                <img src="/static/Images/footer-logo.png" />
            </a>
        </div>
        <div v-else>
            <p>
                Copyright ©{{year}} Major Global Marketing Company Limited powered by Eventizer
                <a target="_blank" href="https://eventizer.hk/">
                    <img src="/static/Images/footer-logo.png" />
                </a>
            </p>

        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class InsCopyright extends Vue {
    year: number = 0;

    get isMobile () {
      return this.$store.state.isMobile;
    }

    created () {
      let date = new Date();
      this.year = date.getFullYear();
    }
}
</script>
<style lang="less" scoped>
.copyright {
    // background-color: #535353;
}

.pc {
    .copyright {
        text-align: center;
        padding: 20px 0;
        padding-top: 10px ;
        p {
            color: #5a5a5a;
            font-size: 14px;
            display: inline-block;
            vertical-align: middle;
        }

        img {
            vertical-align: middle;
            margin-left: 12px;
        }
    }
}

.mobile {
    .copyright {
        padding: 0.6rem 1rem 1rem;
        text-align: center;

        p {
            display: inline-block;
            color: #5a5a5a;
            font-size: 1rem;
            vertical-align: middle;
        }

        img {
            vertical-align: middle;
            margin-left: 0.5rem;
        }
    }
}
</style>
