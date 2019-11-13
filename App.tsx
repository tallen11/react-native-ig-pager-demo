import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Dimensions,
} from 'react-native';

import MultiPageIndicator from './src/components/MultiPageIndicator';

const Pages = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

export default class App extends React.Component {

    render(): JSX.Element {
        return (
            <SafeAreaView style={Styles.container}>
                <ScrollView style={Styles.scrollView}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    horizontal
                    snapToInterval={Dimensions.get('window').width}>
                    {Pages.map(val => (
                        <View style={Styles.demoView}
                            key={val}>
                            <Text style={Styles.numberText}>{val}</Text>
                        </View>
                    ))}
                </ScrollView>
                <View style={Styles.pagerContainer}>
                    <MultiPageIndicator
                        width={5}
                        indexCount={Pages.length}
                        currentIndex={0} />
                </View>
            </SafeAreaView>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    scrollView: {
        flex: 1,
        width: '100%',
    },

    demoView: {
        width: Dimensions.get('window').width,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    numberText: {
        fontFamily: 'AvenirNext-Bold',
        fontSize: 56,
    },

    pagerContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 30,
    },
});
