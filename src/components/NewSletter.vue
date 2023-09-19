<template>
  <div class="newsletter-bar">
    <div v-for="item in newsletter.items" :key="item">
      <div v-html="item.content"></div>
    </div>
    <div class="action-newsletter">
      <input type="text" placeholder="Enter your email address…">
      <button class="blue-button"><span>Subscribe</span></button>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  export default {
    name: "TheFooter",
    data() {
      return {
        newsletter: ''
      };
    },
    apollo: {
      newsletter: gql`query {
        newsletter: cmsBlocks(identifiers: ["newsletter"]) {
          items {
            content
          }
        },
      }`,
    },
    updated: function () {
    }
  }
</script>

<style>
.newsletter-bar {
  background: linear-gradient(131.46deg, #173F4A 0%, #436E79 100%);
  padding: 27px 15px 24px;
}

.newsletter-bar h3 {
  color: #fff;
  font-family: 'Oswald';
  font-size: 32px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 34px;
  margin: 0 15px 8px;
  text-transform: uppercase;
}

.newsletter-bar p {
  color: #fff;
  font-family: 'Montserrat';
  font-size: 16px;
  letter-spacing: 0;
  line-height: 19px;
  margin: 0 0 20px;
}

.action-newsletter {
  border-radius: 5px;
  display: flex;
  overflow: hidden;
  max-width: 438px;
  margin: 0 auto;
}

.action-newsletter input {
  padding: 18px 17px;
  border: none;
  flex-grow: 1;
  outline: none;
}

.action-newsletter button {
  color: #fff;
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 13px;
  border: none;
  padding: 0 16px;
  cursor: pointer;
}

.action-newsletter input {
  color: #8D929A;
  font-family: 'Montserrat';
  font-size: 15px;
  letter-spacing: 0;
  line-height: 19px;
}

.action-newsletter input::-webkit-input-placeholder {
  color: #8D929A;
  font-family: 'Montserrat';
  font-size: 15px;
  letter-spacing: 0;
  line-height: 19px;
}

.action-newsletter input::-moz-placeholder {
  color: #8D929A;
  font-family: 'Montserrat';
  font-size: 15px;
  letter-spacing: 0;
  line-height: 19px;
}

.action-newsletter input:-ms-input-placeholder {
  color: #8D929A;
  font-family: 'Montserrat';
  font-size: 15px;
  letter-spacing: 0;
  line-height: 19px;
}

.action-newsletter input:-moz-placeholder {
  color: #8D929A;
  font-family: 'Montserrat';
  font-size: 15px;
  letter-spacing: 0;
  line-height: 19px;
}

@media only screen and (min-width: 1024px) {
  .newsletter-bar {
    padding: 64px;
  }

  .newsletter-bar h3 {
    font-size: 42px;
    margin-block: 16px;
  }

  .newsletter-bar p {
    margin: 0 0 28px;
  }
}
</style>