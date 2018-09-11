class PropsProvider {
    constructor(context) {
        this.context = context;
    }
    getComponentProps(props) {
        const {config, actions, topicName} = props;
        return {
            intl: props.intl,
            widgetName: config.defaultName,
            setName: actions.setName,
            name: props.name,
            topicName
        };
    }
}

export default PropsProvider;
