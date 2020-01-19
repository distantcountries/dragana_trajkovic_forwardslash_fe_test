<template>
    <div class="footer-wrapper">
        <div class="footer">
            <div class="footer-top-border">
                <div class="border"></div>
            </div>
            <div class="footer-sections">
                <div class="section">
                    <h1>Links</h1>
                    <a href="#"><h2>Company</h2></a>
                    <a href="#"><h2><span>Catalogs</span></h2></a>
                    <a href="#"><h2>Contact</h2></a>
                    <a href="#"><p><span>Become a dealer</span></p></a>
                    <a href="#"><p>Find a dealer</p></a>
                    <a href="#"><p>Order forms</p></a>
                    <a href="#"><p>Login/Register</p></a>
                </div>
                <div class="footer-border"></div>
                <div class="section">
                    <h1>Dev test</h1>
                    <p>
                        Dev test<br />
                        1421 38th Brooklyn, NY<br />
                        11245-5647 USA<br /><br />
                        (718= 633-2300<br />
                        info@devtest.com
                    </p>
                </div>
                <div class="footer-border"></div>
                <div class="section">
                    <h1>Newsletter</h1>
                    <div class="section-button-wrapper">
                        <div class="section-button">
                            <div class="icon segment">
                                <img src="./../../public/img/icons/letter.png" />
                            </div>
                            <div class="text segment">
                                <p>Email Address</p>
                            </div>
                            <div class="icon segment">
                                <button @click="handleEmail()"><img src="./../../public/img/icons/arrow-right.png" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <p>© <b>DEVTEST</b> — 2019 All Right Reserved.</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            handleEmail() {
                alert('handle email')
            }
        }
    }
</script>
