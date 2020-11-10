export default class FormConfigBuilder {

    //* by default type is 'text'
    constructor(elementType, type = 'text') {
        this.elementType = elementType;
        this.type = type;

        //! default values
        this.validation = {};
        this.touched = false;
        this.elementConfig = {};
        this.valid = false;
        this.value = '';
    }

    setValid(validity) {
        this.valid = validity;
        return this;
    }

    setType(type) {
        this.elementConfig.type = type;
        return this;
    }

    setPlaceHolder(placeholder) {
        this.elementConfig.placeholder = placeholder;
        return this;
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    setOptions(options) {
        this.elementConfig.options = options;
        return this;
    }

    setValidation(validation) {
        this.validation = validation;
        return this;
    }

    build() {
        // returning normal object
        return { ...this };
    }
}