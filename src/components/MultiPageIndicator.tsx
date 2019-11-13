import React from 'react';

import {
    View, StyleSheet,
} from 'react-native';

import MultiPageIndicatorItem from './MultiPageIndicatorItem';

interface Props {
    readonly width: number;
    readonly indexCount: number;
    readonly currentIndex: number;
}

export default class MultiPageIndicator extends React.Component<Props> {

    private renderItems(): JSX.Element[] {
        const items = new Array<JSX.Element>();
        for (let i = 0; i < this.props.indexCount; ++i) {
            items.push(
                <MultiPageIndicatorItem
                    key={i}
                    selected={i === this.props.currentIndex} />
            );
        }

        return items;
    }

    render(): JSX.Element {
        return (
            <View style={Styles.container}>
                {this.renderItems()}
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});
