<template>

  <div id="vox-login">

    <div id="vox-login-button">
      <button @click.prevent="openPopup" class="pure-button btn-bruschetta-tomato">
        Login with <img id="vox-wallet-logo" src="/assets/vox_wallet-logo.png"/>
      </button>
    </div>

    <div id="vox-popup" class="popup-wrapper hide">
      <div class="popup-content">

        <div class="popup-title">
          <button type="button" class="popup-close">&times;</button>
        </div>

        <div class="popup-body">

          <div id="vox-login-section">
            <form class="pure-form pure-form-stacked">

            <div id="vox-info-section">

              <div class="pure-g">

                <div class="pure-u-1-4">
                  <div id="vox-company-logo-div" align="center">
                    <img id="vox-company-logo" :src="companylogo"/>
                  </div>
                </div>

                <div class="pure-u-3-4">
                  <div>
                    <div id="vox-company-info">
                      <h3 id="vox-company-name">{{companyname}}</h3>
                    </div>
                  </div>
                </div>

              </div>

            </div>
              <br>
              <div align="center">
                <div id="vox-warning-message" v-if="warrningMessage">
                  {{warrningMessage}}
                </div>

                <div id="vox-success-message" v-if="successMessage">
                  {{successMessage}}
                </div>

                <div id="vox-form-info">
                  <fieldset>
                    <label for="vox-email">Email</label>
                    <input class="vox-input" id="vox-email" type="text" v-model="email">
                  </fieldset>

                  <fieldset>
                    <label for="vox-password">Password</label>
                    <input class="vox-input" id="vox-password" type="password" v-model="password">
                  </fieldset>
                </div>

                <div align="center" v-if="errorMessages">
                  <br>
                  <span id="vox-error-message">{{errorMessages}}</span>
                </div>

                <div id="vox-button-div" align="center" v-else>
                  <!-- <br> -->
                  <button @click.prevent="login" class="pure-button btn-bruschetta-tomato">Login</button>
                </div>

              </div>
          </form>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>



<script>
  import $ from 'jquery';
  import axios from 'axios';
  import Popup from '../../lib/simple-popup.min.js';

  export default {
    props: {
      companylogo: { type: String, required: false },
      companyname: { type: String, required: true }
    },
    data () {
      return {
        email: "",
        password: "",
        errorMessages: null,
        warrningMessage: null,
        successMessage: null,
        loading: false
      }
    },
    computed: {

    },
    methods: {
      openPopup() {
        this.errorMessages = null;
        let popupEl = document.getElementById('vox-popup');
        let popup = new Popup(popupEl, {
          width: 370,
          height: 400
        });
        let open = document.getElementById('open');
        popup.open(open);
      },
      login() {
        this.setWarningMessage(null);
        this.setSuccessMessage(null);

        const user = {
          email: this.email,
          password: this.password
        }

        axios.post('http://142.93.42.221/api/user/login', user)
        .then(res => {
          console.log(res);
          const now = new Date();

          console.log('res', res);

          const experationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
          localStorage.setItem('vox-token', res.data.token);
          localStorage.setItem('vox-userId', res.data.userId);
          localStorage.setItem('vox-experationDate', experationDate);

          this.loading = false;

          this.setSuccessMessage("Login successful");
        })
        .catch(error => {
          this.loading = false;
          this.setWarningMessage("Auth failed");
          console.log(error);
        });

      },
      setWarningMessage(message) {
        this.warrningMessage = message;
      },
      setSuccessMessage(message) {
        this.successMessage = message;
      },

    }
  }
</script>

<style scoped>
  /* https://fonts.google.com/specimen/Montserrat?selection.family=Montserrat */
  @import url('https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet');
  @import url(https://cdnjs.cloudflare.com/ajax/libs/pure/1.0.0/grids-min.css);
  @import url(https://cdnjs.cloudflare.com/ajax/libs/pure/1.0.0/forms-min.css);
  @import url(https://cdnjs.cloudflare.com/ajax/libs/pure/1.0.0/buttons-min.css);


  /*#vox-login > p h1 h2 h3 h4 h5 b a input {*/
  * {
    font-family: 'Montserrat', sans-serif;
  }

  #vox-login-button {
    width: 100%;
    height: 100%;
  }

  #vox-wallet-logo {
    width: 60px;
  }

  #vox-warning-message {
    background-color: #e84118;
    color: #fff;
    padding: 15px;
  }

  #vox-success-message {
    background-color: #1dd1a1;
    color: #fff;
    padding: 15px;
  }

  #login-section a {
    display: inline-block;
    border: 1px solid #ddd;
    padding: 10px 20px;
    margin-right: 10px;
    text-transform: uppercase;
    color: #999;
    text-decoration: none;
  }
  #login-section a:hover {
    color: #333;
    border-color: #888;
  }

  .vox-input {
    width: 80%;
    height: 40px;
  }

  #vox-company-logo {
    height: 70px;
    width: 70px;
    border-radius: 5%;
    align-content: center;
    align-items: center;
    /* border: solid 2px gray; */
    padding: 5px;
    margin: 5px 15px 5px 15px;
  }

  #vox-button-div {
    padding: 10px;
  }

  #vox-error-message {
    font-size: 14px;
    color: #c23616;
  }

  #vox-success-message {
    font-size: 14px;
    color: #008000;
  }

  #vox-info-section {
    border-bottom: 1px solid #2A7DE1;
    padding-bottom: 10px;
    background: #2A7DE1;
    color: white;
  }

  .btn-bruschetta-tomato {
    background: #2A7DE1;
    color: white;
    /* border-radius: 50px; */
    padding: 10px 20px;
  }

  #vox-company-name {
    margin-top: 35px;
    margin-left: 50px;
  }

  .hide {
    display: none;
  }

  .popup-wrapper {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px #aaa;
    overflow: hidden;
  }

  .popup-title {
    padding: 10px 15px;
    background-color: #2A7DE1;
    border-bottom: 1px solid #2A7DE1;
    color: white;
  }

  .popup-title h3 {
    margin: 0;
    line-height: 1.5em;
  }

  .popup-body {
    color: #555;

  }

  .popup-close {
    float: right;
    margin-top: 2px;
    padding: 0;
    font-size: 24px;
    line-height: 1;
    border: 0;
    background: transparent;
    color: white;
    cursor: pointer;
  }

  .popup-close:hover {
    color: white;
  }

</style>
