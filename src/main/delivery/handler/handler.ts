exports.execute = async function (event: any, context: any) {
    const now = new Date();
    console.log('+*+++*+*+*+*+START*+*+*+*+*+**+*++*+*');
    console.log('EVENT OCCURRED!');
    console.log(`Message created on ${now}`);
    // Print the event that triggers the lambda
    console.log(`EVENT: \n${JSON.stringify(event, null, 2)}`);
    console.log('+*+++*+*+*+*+*END+*+*+*+*+**+*++*+*');
    return context.logStreamName;
};
