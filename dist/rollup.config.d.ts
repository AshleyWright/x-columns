declare const config: {
    input: string;
    output: ({
        file: string;
        format: string;
        sourcemap: boolean;
        name?: undefined;
    } | {
        file: string;
        format: string;
        sourcemap: boolean;
        name: string;
    })[];
    plugins: any[];
};
export default config;
