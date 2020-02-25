import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import LoginScreen from './LoginScreen'
import Register from './Register'

const AppNavigator = createStackNavigator({
    Home:{screen:LoginScreen},
    Register:{screen:Register}
})

const App = createAppContainer(AppNavigator)

export default App;