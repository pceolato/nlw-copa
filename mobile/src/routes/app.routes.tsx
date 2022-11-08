import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PlusCircle, SoccerBall } from 'phosphor-react-native';

import { New } from '../screens/New';
import { Pools } from '../screens/Pools';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
    return(
        <Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'red',
            tabBarInactiveTintColor: 'blue',
        }}>
            <Screen 
                name="new"
                component={New}
                options={{
                    tabBarIcon: ({ color }) => <PlusCircle color={color}/>
                }}
            />
            <Screen 
                name="pools"
                component={Pools}
                options={{
                    tabBarIcon: ({ color }) => <SoccerBall color={color} />
                }}
            />
        </Navigator>
    );
}