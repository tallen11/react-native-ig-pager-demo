import React from 'react';

import {
    View,
    StyleSheet,
    Animated,
} from 'react-native';

import MultiPageIndicatorItem from './MultiPageIndicatorItem';

interface Props {
    readonly indexCount: number;
    readonly currentIndex: number;
}

interface State {
    windowCenter: number;
    windowIndex: number;

    itemScales: Animated.Value[];
    firstLeftItemScale: Animated.Value;
    firstRightItemScale: Animated.Value;
    secondLeftItemScale: Animated.Value;
    secondRightItemScale: Animated.Value;
    thirdLeftItemScale: Animated.Value;
    thirdRightItemScale: Animated.Value;

    itemTranslationXs: Animated.Value[];
    firstLeftItemTranslationX: Animated.Value;
    firstRightItemTranslationX: Animated.Value;
    secondLeftItemTranslationX: Animated.Value;
    secondRightItemTranslationX: Animated.Value;
    thirdLeftItemTranslationX: Animated.Value;
    thirdRightItemTranslationX: Animated.Value;
}

export default class MultiPageIndicator extends React.Component<Props, State> {

    static WIDTH = 3;

    constructor(props: Props) {
        super(props);

        const itemScales = [];
        const itemTranslationXs = [];
        for (let i = 0; i < MultiPageIndicator.WIDTH; ++i) {
            itemScales.push(new Animated.Value(1.0));
            itemTranslationXs.push(new Animated.Value(0.0));
        }

        this.state = {
            windowCenter: 0,
            windowIndex: 0,

            itemScales,
            firstLeftItemScale: new Animated.Value(0.0),
            firstRightItemScale: new Animated.Value(0.75),
            secondLeftItemScale: new Animated.Value(0.0),
            secondRightItemScale: new Animated.Value(0.5),
            thirdLeftItemScale: new Animated.Value(0.0),
            thirdRightItemScale: new Animated.Value(0.0),

            itemTranslationXs,
            firstLeftItemTranslationX: new Animated.Value(0.0),
            firstRightItemTranslationX: new Animated.Value(0.0),
            secondLeftItemTranslationX: new Animated.Value(0.0),
            secondRightItemTranslationX: new Animated.Value(0.0),
            thirdLeftItemTranslationX: new Animated.Value(0.0),
            thirdRightItemTranslationX: new Animated.Value(0.0),
        };
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.currentIndex !== prevProps.currentIndex) {
            const d = this.props.currentIndex - prevProps.currentIndex;
            if (this.props.currentIndex > this.state.windowCenter + 2) {
                this.setState({ windowCenter: this.state.windowCenter + d }, () => {
                    Animated.parallel(this.getRightAnimations(200.0)).start(() => {
                        this.resetAnimatedState();
                    });
                });
            } else if (this.props.currentIndex <= this.state.windowCenter - 1) {
                this.setState({ windowCenter: this.state.windowCenter + d }, () => {
                    Animated.parallel(this.getLeftAnimations(200.0)).start(() => {
                        this.resetAnimatedState();
                    });
                });
            } else {
                this.setState({ windowIndex: this.state.windowIndex + d });
            }
        }
    }

    private getRightAnimations(duration: number): Animated.CompositeAnimation[] {
        const { windowCenter } = this.state;

        const shiftAmount = 4.0 + MultiPageIndicatorItem.SIZE;
        const animations = [
            this.createAnimation(this.state.firstRightItemScale, 1.0, duration),
            this.createAnimation(this.state.itemScales[0], 0.75, duration),

            this.createAnimation(this.state.firstRightItemTranslationX, -shiftAmount, duration),
            this.createAnimation(this.state.firstLeftItemTranslationX, -shiftAmount, duration),
            this.createAnimation(this.state.secondRightItemTranslationX, -shiftAmount, duration),
            this.createAnimation(this.state.secondLeftItemTranslationX, -shiftAmount, duration),
            this.createAnimation(this.state.thirdRightItemTranslationX, -shiftAmount, duration),

            ...this.state.itemTranslationXs.map(av => this.createAnimation(av, -shiftAmount, duration)),
        ];

        if (windowCenter < this.props.indexCount - MultiPageIndicator.WIDTH) {
            animations.push(this.createAnimation(this.state.secondRightItemScale, 0.75, duration));
        }

        if (windowCenter < this.props.indexCount - MultiPageIndicator.WIDTH - 1) {
            animations.push(this.createAnimation(this.state.thirdRightItemScale, 0.5, duration));
        }

        if (windowCenter > 1) {
            animations.push(this.createAnimation(this.state.firstLeftItemScale, 0.5, duration));
        }

        if (windowCenter > 2) {
            animations.push(this.createAnimation(this.state.secondLeftItemScale, 0.0, duration));
        }

        return animations;
    }

    private getLeftAnimations(duration: number): Animated.CompositeAnimation[] {
        const { windowCenter } = this.state;

        const shiftAmount = 4.0 + MultiPageIndicatorItem.SIZE;
        const animations = [
            this.createAnimation(this.state.firstLeftItemScale, 1.0, duration),
            this.createAnimation(this.state.itemScales[MultiPageIndicator.WIDTH-1], 0.75, duration),

            this.createAnimation(this.state.firstRightItemTranslationX, shiftAmount, duration),
            this.createAnimation(this.state.firstLeftItemTranslationX, shiftAmount, duration),
            this.createAnimation(this.state.secondRightItemTranslationX, shiftAmount, duration),
            this.createAnimation(this.state.secondLeftItemTranslationX, shiftAmount, duration),
            this.createAnimation(this.state.thirdLeftItemTranslationX, shiftAmount, duration),

            ...this.state.itemTranslationXs.map(av => this.createAnimation(av, shiftAmount, duration)),
        ];

        if (windowCenter > 0) {
            animations.push(this.createAnimation(this.state.secondLeftItemScale, 0.75, duration));
        }

        if (windowCenter > 1) {
            animations.push(this.createAnimation(this.state.thirdLeftItemScale, 0.5, duration));
        }

        if (windowCenter < this.props.indexCount - MultiPageIndicator.WIDTH - 1) {
            animations.push(this.createAnimation(this.state.firstRightItemScale, 0.5, duration));
        }

        if (windowCenter < this.props.indexCount - MultiPageIndicator.WIDTH - 2) {
            animations.push(this.createAnimation(this.state.secondRightItemScale, 0.0, duration));
        }

        return animations;
    }

    private resetAnimatedState() {
        const { windowCenter } = this.state;

        this.state.thirdRightItemScale.setValue(0.0);
        this.state.thirdLeftItemScale.setValue(0.0);
        this.state.itemScales[0].setValue(1.0);
        this.state.itemScales[MultiPageIndicator.WIDTH-1].setValue(1.0);

        this.state.firstLeftItemScale.setValue(windowCenter > 0 ? 0.75 : 0.0);
        this.state.secondLeftItemScale.setValue(windowCenter > 1 ? 0.5 : 0.0);

        this.state.firstRightItemScale.setValue(windowCenter < this.props.indexCount - MultiPageIndicator.WIDTH ? 0.75 : 0.0);
        this.state.secondRightItemScale.setValue(windowCenter < this.props.indexCount - MultiPageIndicator.WIDTH - 1 ? 0.5 : 0.0);

        this.state.firstRightItemTranslationX.setValue(0.0);
        this.state.secondRightItemTranslationX.setValue(0.0);
        this.state.thirdRightItemTranslationX.setValue(0.0);
        this.state.firstLeftItemTranslationX.setValue(0.0);
        this.state.secondLeftItemTranslationX.setValue(0.0);
        this.state.thirdLeftItemTranslationX.setValue(0.0);

        for (let av of this.state.itemTranslationXs) {
            av.setValue(0.0);
        }
    }

    private createScaleLeftAnimation(animatedValue: Animated.Value, scale: number, duration: number): Animated.CompositeAnimation {
        return Animated.timing(animatedValue, {
            toValue: scale,
            duration: duration,
            useNativeDriver: true,
        });
    }

    private createAnimation(animatedValue: Animated.Value, value: number, duration: number): Animated.CompositeAnimation {
        return Animated.timing(animatedValue, {
            toValue: value,
            duration: duration,
            useNativeDriver: true,
        });
    }

    private renderLeftAuxillaryItems(): JSX.Element {
        return (
            <>
                <MultiPageIndicatorItem
                    key={-3}
                    selected={false}
                    scale={this.state.thirdLeftItemScale}
                    translationX={this.state.thirdLeftItemTranslationX} />
                <MultiPageIndicatorItem
                    key={-2}
                    selected={false}
                    scale={this.state.secondLeftItemScale}
                    translationX={this.state.secondLeftItemTranslationX} />
                <MultiPageIndicatorItem
                    key={-1}
                    selected={false}
                    scale={this.state.firstLeftItemScale}
                    translationX={this.state.firstLeftItemTranslationX} />
            </>
        );
    }

    private renderRightAuxillaryItems(): JSX.Element {
        return (
            <>
                <MultiPageIndicatorItem
                    key={this.props.indexCount}
                    selected={false}
                    scale={this.state.firstRightItemScale}
                    translationX={this.state.firstRightItemTranslationX} />
                <MultiPageIndicatorItem
                    key={this.props.indexCount+1}
                    selected={false}
                    scale={this.state.secondRightItemScale}
                    translationX={this.state.secondRightItemTranslationX} />
                <MultiPageIndicatorItem
                    key={this.props.indexCount+2}
                    selected={false}
                    scale={this.state.thirdRightItemScale}
                    translationX={this.state.thirdRightItemTranslationX} />
            </>
        );
    }

    private renderItems(): JSX.Element[] {
        const items = new Array<JSX.Element>();
        for (let i = 0; i < MultiPageIndicator.WIDTH; ++i) {
            items.push(
                <MultiPageIndicatorItem
                    key={i}
                    selected={i === this.state.windowIndex}
                    scale={this.state.itemScales[i]}
                    translationX={this.state.itemTranslationXs[i]} />
            );
        }

        return items;
    }

    render(): JSX.Element {
        return (
            <View style={Styles.container}>
                {this.renderLeftAuxillaryItems()}
                {this.renderItems()}
                {this.renderRightAuxillaryItems()}
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
