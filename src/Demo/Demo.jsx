import Mobile from './Mobile';
import Web from './Web';
import withScreenSizes from '../hoc/withScreenSizes';

const Demo = ({ width, heigth }) => {
    return <div>
        <h1>Demo </h1>

        {
            width >= 1200 ? <Web /> : <Mobile />
        }
    </div>
}

export default withScreenSizes(Demo);