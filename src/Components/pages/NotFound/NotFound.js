import styles from './notfound.module.css';
import Panda404 from '../../../assets/images/404.png';

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <img src={Panda404} alt="404" />
        </div>
    );
}

export default NotFound;