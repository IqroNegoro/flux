// import validator from "validator";

// export default {
//     errors: {},
//     result: {},
//     entries: (object) => Object.entries(object)[0].map(v => {
//         let text = validator.escape(v);
//         text = validator.trim(v);
//         return text
//     }),
//     hasErr() {
//         this.result = this.errors,
//         this.errors = {};
//         if (Object.keys(this.result).length) {
//             return true;
//         } else {
//             return false;
//         }
//     },
//     isEmail(object, message) {
//         const body = this.entries(object);
//         if (!validator.isEmail(body[1])) {
//             this.errors[body[0]] = message
//         }
//         return this;
//     },
//     isEmpty(object, message) {
//         const body = this.entries(object);
//         if (validator.isEmpty(body[1])) {
//             this.errors[body[0]] = message
//         }
//         return this;
//     },
//     isAlphanumeric(object, message) {
//         const body = this.entries(object);
//         if (validator.isAlphanumeric(body[1])) {
//             this.errors[body[0]] = message
//         }
//         return this;
//     },
//     isAlpha(object, message) {
//         const body = this.entries(object);
//         if (!validator.isAlpha(body[1])) {
//             this.errors[body[0]] = message
//         }
//         return this;
//     },
//     isLength(object, options = undefined, message) {
//         const body = this.entries(object);
//         if (!validator.isLength(body[1], options)) {
//             this.errors[body[0]] = message
//         }
//         return this;
//     }
// }
import validator from "validator";

export default object => {
    Object.entries(object).forEach(v => {
        let filter = validator.escape(v[1]);
        filter = validator.trim(filter);
        object[v[0]] = filter
    });

    return {
        result: object,
        errors: {},
        hasErr() {
            if (Object.keys(this.errors).length) {
                this.result = this.errors,
                this.errors = {};
                return true;
            } else {
                return false;
            }
        },
        isEmail(key, message) {
            if (!validator.isEmail(object[key])) {
                this.errors[key] = message
            }
            return this;
        },
        isEmpty(key, message) {
            if (validator.isEmpty(object[key])) {
                this.errors[key] = message
            }
            return this;
        },
        isAlphanumeric(key, message) {
            if (validator.isAlphanumeric(object[key], "en-US", {ignore: /\s/gi})) {
                this.errors[key] = message
            }
            return this;
        },
        isAlpha(key, message) {
            if (!validator.isAlpha(object[key], "en-US", {ignore: /\s/gi})) {
                this.errors[key] = message
            }
            return this;
        },
        isLength(key, options = undefined, message) {
            if (!validator.isLength(object[key], options)) {
                this.errors[key] = message
            }
            return this;
        }
    }
}