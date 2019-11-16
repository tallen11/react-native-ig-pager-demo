import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent,
    StatusBar,
} from 'react-native';

import MultiPageIndicator from './src/components/MultiPageIndicator';

const Pages = [1,2,3,4,5,6,7,8,9,10]; //,11,12,13,14,15,16,17,18,19,20];

interface State {
    currentIndex: number;
}

export default class App extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props);

        this.state = {
            currentIndex: 0,
        };
    }

    // private onScrollDidEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    //     const index = Math.max(0, Math.floor(event.nativeEvent.contentOffset.x / Dimensions.get('window').width));
    //     this.setState({ currentIndex: index });
    // }

    private onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
        const index = Math.max(0, Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width));
        if (this.state.currentIndex !== index) {
            this.setState({ currentIndex: index });
        }
    }

    render(): JSX.Element {
        return (
            <SafeAreaView style={Styles.container}>
                <StatusBar barStyle={'light-content'} />
                <ScrollView style={Styles.scrollView}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    horizontal
                    snapToInterval={Dimensions.get('window').width}
                    onScroll={this.onScroll.bind(this)}
                    scrollEventThrottle={60.0}
                    disableIntervalMomentum>
                    {Pages.map(val => (
                        <View style={Styles.demoView}
                            key={val}>
                            <Text style={Styles.numberText}>{`PAGE\n${val}`}</Text>
                        </View>
                    ))}
                </ScrollView>
                <View style={Styles.pagerContainer}>
                    <MultiPageIndicator
                        indexCount={Pages.length}
                        currentIndex={this.state.currentIndex} />
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
        backgroundColor: '#222222',
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
        textAlign: 'center',
        color: '#DDDDDD'
    },

    pagerContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 30,
    },
});
