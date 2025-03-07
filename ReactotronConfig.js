import Reactotron, { networking , asyncStorage } from "reactotron-react-native";
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron
    .configure({ name: 'React Native Demo' }) // controls connection & communication settings
    .useReactNative({
        storybook: true,
    }) // add all built-in react native plugins
    .use(networking({
        ignoreContentTypes: /^(image)\/.*$/i,
        ignoreUrls: /\/(logs|symbolicate)$/,
    }))
    .use(asyncStorage())
    .use(reactotronRedux())
    .connect(); // let's connect!

export default reactotron
