import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async () => {
  const [name, setName] = useState('');
  const [uId, setUId] = useState('');
  const [token, setToken] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [userid, setuserId] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');
  try {
    const name = await AsyncStorage.getItem('name');
    const token = await AsyncStorage.getItem('token');
    const uId = await AsyncStorage.getItem('uid');
    const username = await AsyncStorage.getItem('username');
    const email = await AsyncStorage.getItem('email');
    const subscriptionId = await AsyncStorage.getItem('subscription_id');
    const userId = await AsyncStorage.getItem('userid');

    if (name !== null) {
      setName(name);
    }
    if (token !== null) {
      setToken(token);
    }
    if (uId !== null) {
      setUId(uId);
    }
    if (username !== null) {
      setUserName(username);
    }
    if (email !== null) {
      setEmail(email);
    }
    if (subscriptionId !== null) {
      setSubscriptionId(subscriptionId);
    }
    if (userId !== null) {
      setuserId(userId);
    }
  } catch (err) {
    console.log(err.message);
  }
};
