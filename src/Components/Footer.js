import Logo from '../Images/Logo.png';
export default function Footer() {

    return (
        <footer className="site-footer" id='footer'>
            <img className="LogoFooter Column" src={Logo} alt="Logo"></img>
            <div>
                <div>
                    <h6>Contact Us</h6>
                    <ul>
                        <label>Phone: 052-3292847</label>
                        <label>Email: Shohamkatzav95@gmail.com</label>
                    </ul>
                </div>

            </div>
            <div className="container">
                <hr />
                <div>
                    <div >
                        <p className="copyright-text">Copyright &copy; 2022 All Rights Reserved by Shoham Kaztav
                        </p>
                    </div>

                </div>
            </div>
        </footer>)
}