import React from 'react';

import {
    View, StyleSheet,
} from 'react-native';

interface Props {
    readonly selected: boolean;
}

export default class MultiPageIndicatorItem extends React.Component<Props> {

    static size = 8;

    render(): JSX.Element {
        return (
            <View style={[Styles.container, {
                backgroundColor: this.props.selected ? 'red' : 'black',
            }]} />
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        width: MultiPageIndicatorItem.size,
        height: MultiPageIndicatorItem.size,
        marginLeft: 2,
        marginRight: 2,
        borderRadius: MultiPageIndicatorItem.size / 2.0,
    },
});
