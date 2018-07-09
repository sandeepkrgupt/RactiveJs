class PropsProvider {
    constructor(context) {
        this.context = context;
    }
    getComponentProps(props) {
        const {config, actions} = props;
        return {
            intl: props.intl,
            widgetName: config.defaultName,
            name: props.name,
            actions
        };
    }
}

export default PropsProvider;
