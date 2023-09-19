<template>
  <footer>
    <div v-for="item in footer.items" :key="item">
      <div v-html="item.content"></div>
    </div>
  </footer>
</template>

<script>
  import gql from 'graphql-tag'
  const $ = window.$

  export default {
    name: "TheFooter",
    data() {
      return {
        footer: ''
      };
    },
    apollo: {
      footer: gql`query {
        footer: cmsBlocks(identifiers: ["footer"]) {
          items {
            content
          }
        },
      }`,
    },
    updated: function () {
      $('.accordion h4').click(function(){
        $(this).siblings('[data-content-type="text"]').slideToggle();
        $(this).toggleClass('active');
      });
    }
  }
</script>

<style>
#html-body footer {
  background-color: #F5F5F5;
  padding-top: 24px;
}

.show-review #html-body footer {
  padding-top: 177px;
}

#html-body footer p,
#html-body footer h4 {
  margin: 0;
}

#html-body footer h4 {
  color: #000;
  font-family: 'Oswald';
  font-size: 15px;
  letter-spacing: 0.5px;
  line-height: 17px;
  text-transform: uppercase;
  font-weight: 400;
}

#html-body footer .footer-top .pagebuilder-column-line {
  display: flex;
  flex-direction: column;
}

#html-body .footer-payment {
  order: -1;
  padding: 0 0 33px;
  border-bottom: 1px solid #EBEBEB;
  margin: 0 10px;
}

#html-body .footer-top .pagebuilder-column {
  width: auto;
}

#html-body .footer-payment  p {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#html-body .footer-payment h4 {
  margin-bottom: 28px;
}

#html-body .footer-payment img {
  max-height: 24px;
}

#html-body .footer-payment img:first-child,
#html-body .footer-payment img:nth-child(3) {
  margin-bottom: 29px;
}

#html-body footer img {
  width: auto;
  margin: 0 24px;
}

#html-body .accordion {
  border-top: 1px solid #EBEBEB;
  text-align: left;
  margin: 0 20px;
}

#html-body .accordion:first-child {
  border: none;
}

#html-body .accordion h4 {
  font-weight: 500;
  padding: 20px 0 17px;
  display: flex;
  justify-content: space-between;
}

#html-body .accordion h4:after {
  content: '';
  width: 14px;
  height: 14px;
  background-image: url('../assets/plus-footer-icon.jpg');
  display: block;
  background-size: contain;
}

#html-body .accordion h4.active:after {
  background-image: url('../assets/minus-footer-icon.jpg');
}

#html-body .accordion [data-content-type="text"] {
  display: none;
  padding-bottom: 10px;
  margin-top: -5px;
}

#html-body .accordion a,
#html-body .accordion p {
  color: #4A4A4A;
  font-family: 'Montserrat';
  font-size: 14px;
  letter-spacing: 0;
  line-height: 26px;
  text-decoration: none;
}

#html-body .footer-top {
  padding-bottom: 10px;
}

#html-body .footer-bottom {
  padding: 14px 5px;
  background-color: #E7E7E7;
}

#html-body .footer-bottom .pagebuilder-column-line {
  box-sizing: border-box;
  display: block;
}

#html-body .footer-bottom p {
  color: #000;
  font-family: 'Montserrat';
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 16px;
}

#html-body .pagebuilder-column.footer-code {
  display: inline-block;
  margin: 0 20px;
  width: auto;
}

#html-body .footer-address {
  margin-top: 8px;
}

#html-body  .pagebuilder-column.footer-address {
  width: auto;
}

@media only screen and (min-width: 1024px) {
  #html-body footer {
    padding-top: 77px;
  }

  .show-review #html-body footer {
    padding-top: 166px;
  }

  #html-body .footer-top {
    padding: 0 20px 72px;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }

  #html-body footer .footer-top .pagebuilder-column-line {
    flex-direction: row;
  }

  #html-body .footer-payment {
    order: 1;
    margin: 0;
    padding: 0;
    border: none;
  }

  #html-body .footer-payment h4 {
    text-align: left;
  }

  #html-body .footer-payment p {
    justify-content: flex-start;
  }

  #html-body .footer-payment img {
    margin: 0 26px 0 0;
  }

  #html-body footer .footer-top .pagebuilder-column-line .pagebuilder-column {
    width: 25%;
  }

  #html-body .accordion [data-content-type="text"] {
    display: block;
    margin-top: 0;
    padding: 0;
  }

  #html-body .accordion h4 {
    pointer-events: none;
    font-weight: 400;
    padding: 0 0 14px;
  }

  #html-body .accordion h4:after {
    display: none;
  }

  #html-body .accordion {
    margin: 0;
    border: none;
  }

  #html-body .footer-bottom .pagebuilder-column-line {
    display: flex;
    align-items: center;
    padding: 22px 20px;
    max-width: 1280px;
    margin: 0 auto;
  }

  #html-body .footer-address {
    margin-top: 0;
    margin-left: auto;
    flex-grow: 1;
  }

  #html-body .footer-bottom p {
    text-align: right;
  }

  #html-body .footer-bottom {
    padding: 0;
  }

  #html-body .footer-code {
    margin: 0 50px 0 0;
  }
}
</style>
