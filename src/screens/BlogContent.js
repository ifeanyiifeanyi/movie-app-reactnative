import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { EXPO_PUBLIC_BASE_URL } from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BlogContent = ({ navigation, route }) => {

    // fetch comments for a blog post 
    const [getComments, setGetComments] = useState([])
    const [getReplies, setGetReplies] = useState([])

    // get commit by user
    const [comment, setComment] = useState('');
    const [IsLoading, SetIsLoading] = useState(false);

    function commentChange(value) {
        setComment(value);
    }

    // for async storage
    const [name, setName] = useState('');
    const [uId, setUId] = useState('');
    const [token, setToken] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [userid, setuserId] = useState('');
    const [subscriptionId, setSubscriptionId] = useState('');


    useEffect(() => {
        getData();
        getUserComments();

    }, [])

    // set user asyn storage values
    const getData = () => {
        try {
            AsyncStorage.getItem('name')
                .then(value => {
                    if (value != null) {
                        setName(value);
                    } else {
                        navigation.navigate('Login')
                    }
                })
            AsyncStorage.getItem('token')
                .then(value => {
                    if (value != null) {
                        setToken(value);
                    }
                })

            AsyncStorage.getItem('uid')
                .then(value => {
                    if (value != null) {
                        setUId(value);
                    }
                })

            AsyncStorage.getItem('username')
                .then(value => {
                    if (value != null) {
                        setUserName(value);
                    }
                })
            AsyncStorage.getItem('email')
                .then(value => {
                    if (value != null) {
                        setEmail(value);
                    }
                })
            AsyncStorage.getItem('subscription_id')
                .then(value => {
                    if (value != null) {
                        setSubscriptionId(value);
                    }
                })
            AsyncStorage.getItem('userid')
                .then(value => {
                    if (value != null) {
                        setuserId(value);
                    }
                })
        } catch (err) {
            console.log(err.message)
        }
    }

    console.log("user id", uId)
    //
    const content = route.params.item;


    // format date
    const dateObj = new Date(content.created_at);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // splitting paragraph
    const splitIntoParagraphs = (content, wordsPerParagraph) => {
        const words = content.split(' ');
        const paragraphs = [];
        let currentParagraph = '';

        words.forEach(word => {
            if (currentParagraph.split(' ').length < wordsPerParagraph) {
                currentParagraph += `${word} `;
            } else {
                paragraphs.push(currentParagraph.trim());
                currentParagraph = `${word} `;
            }
        });

        if (currentParagraph) {
            paragraphs.push(currentParagraph.trim());
        }

        return paragraphs;
    }
    const paragraphs = splitIntoParagraphs(content.description, 50);

    //submit user comments
    function submitComment() {
        SetIsLoading(true);
        axios.post(`${EXPO_PUBLIC_BASE_URL}/api/blog/comment`, {
            userId: parseInt(uId),
            postId: parseInt(content.id),
            comment: comment
        }).then(response => {
            console.log(response.data)
            if (response.data.success === true) {
                SetIsLoading(false);
                Alert.alert('Success', 'Your comment has been posted', [
                    {
                        text: "OK",
                        onPress: () => {
                            setComment('')
                        }
                    }
                ]);
            }
        })
    }

    // get users comments
    function getUserComments() {
        // SetIsLoading(true);
        axios.post(`${EXPO_PUBLIC_BASE_URL}/api/comments`, {
            postId: content.id,
        }).then(response => {
            // console.log(response.data)

            const data = response.data;
            if (data.comments) {
                setGetComments(data.comments)
            }

            if (data.replies) {
                setGetReplies(data.replies)
            }

        }).catch(error => {
            console.log(error)
        })
    }

    function validateComment() {


        if (comment.trim().length < 2) {
            return Alert.alert("warning", "Please enter a valid comment");
        } else {
            submitComment();
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <Image style={styles.bannerImage} source={{ uri: `${EXPO_PUBLIC_BASE_URL}/${content.thumbnail}` }} />
            </View>
            <ScrollView>
                <View style={styles.bottomView}>

                    <View style={styles.titleHeaderSection}>
                        <View>
                            <Text style={styles.textTitle}>{content.title}</Text>
                            <Text style={styles.textView}>Views: {content.views}</Text>
                            <Text style={styles.textView}>Date: {formattedDate}</Text>
                            <View style={styles.authorView}>
                                <Image style={styles.authorImage} source={require('../img/logo/1.jpg')} />
                                <Text style={styles.authorName}>{content.author}</Text>
                            </View>
                        </View>

                    </View>

                    <View>
                        {paragraphs.map((paragraph, index) => (
                            <View key={index} style={styles.contentText}>
                                <Text style={styles.contentBlogText}>{paragraph}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.textAreaContainer} >
                        {
                            IsLoading ? <ActivityIndicator size={'large'} color={'#2fc8f2'} /> : ''
                        }
                        <TextInput
                            style={styles.textArea}
                            underlineColorAndroid="transparent"
                            placeholder="Type Your Comment Here ..."
                            placeholderTextColor="grey"
                            multiline={true}
                            onChangeText={commentChange}
                            value={comment}
                        />
                        <TouchableOpacity style={styles.commentBtn} onPress={validateComment}>
                            <Text style={styles.commentBtnText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lines} />
                    <View>
                        <View>
                            {getComments.length > 0 ? (
                                getComments.map(comment => (
                                    <View key={comment.id}>
                                        <Text>{comment.username}</Text>
                                        <Text>{comment.comment}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text>No comments</Text>
                            )}

                            {getReplies.length > 0 && (
                                <View>
                                    <Text>Replies:</Text>
                                    {getReplies.map(reply => (
                                        <View key={reply.id}>
                                            {/* <Text>{reply.username}</Text> */}
                                            <Text>{reply.reply}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    topView: {
        width: '100%',
        height: 200,
    },
    bottomView: {
        backgroundColor: '#f1f1f1',
        width: '100%',
        height: '100%',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    titleHeaderSection: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        padding: 20
    },
    textTitle: {
        fontSize: 16,
        marginBottom: 15,
        color: '#86e345',
        fontWeight: 'bold'
    },
    contentText: {
        paddding: 20,
        width: '100%'
    },
    contentBlogText: {
        padding: 20,
        textAlign: 'justify',
        fontSize: 16
    },
    authorImage: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    authorView: {
        // justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 10,
    },
    authorName: {
        fontSize: 15,
        color: '#00d3d0',
    },
    textAreaContainer: {
        marginBottom: 30,
        // backgroundColor: 'blue',
        flex: 1,
        marginLeft: 10,
        marginRight: 10
    },
    textArea: {
        borderColor: 'teal',
        borderWidth: 2,
        height: 150,
        justifyContent: "flex-start",
        textAlignVertical: 'top',
        padding: 10,
        marginBottom: 20
    },
    commentBtn: {
        backgroundColor: '#88e6e6',
        width: 100,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6
    },
    commentBtnText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    lines: {
        width: '100%',
        backgroundColor: '#88e6e6',
        height: 2
    }

});

export default BlogContent;
