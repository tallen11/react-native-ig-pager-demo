import React from 'react';

import {
    Animated,
    StyleSheet,
} from 'react-native';

interface Props {
    readonly selected: boolean;
    readonly scale: number | Animated.Value;
    readonly translationX: number | Animated.Value;
}

export default class MultiPageIndicatorItem extends React.Component<Props> {

    static SIZE = 8;

    private getScale(): number {
        return 1.0;
    }

    render(): JSX.Element {
        return (
            <Animated.View style={[Styles.container, {
                transform: [
                    { translateX: this.props.translationX },
                ],
            }]}>
                <Animated.View style={[Styles.item, {
                    transform: [
                        { scale: this.props.scale },
                    ],
                    backgroundColor: this.props.selected ? '#58b7db' : '#666666',
                }]} />
            </Animated.View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        width: MultiPageIndicatorItem.SIZE,
        height: MultiPageIndicatorItem.SIZE,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 2,
        marginRight: 2,
    },

    item: {
        width: '100%',
        height: '100%',
        borderRadius: MultiPageIndicatorItem.SIZE / 2.0,
    },
});
