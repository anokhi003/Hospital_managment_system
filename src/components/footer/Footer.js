import classes from '../../css/Footer.module.css'

const Footer = () => {
        return (
                <div className={classes.footer}>
                        <div className={classes.footer_container}>
                                <div className={classes.about}>
                                        <h5>About</h5>
                                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                </div>
                                <div className={classes.about}>
                                        <h5>Links</h5>
                                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                </div >
                                <div className={classes.about}>
                                        <h5>HAve a Questions?</h5>
                                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                </div>
                                <div className={classes.about}>
                                        <h5>Services</h5>
                                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                </div>
                        </div>
                </div>
        );
}

export default Footer;