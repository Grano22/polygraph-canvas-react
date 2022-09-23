import React, {ReactNode} from "react";

type TransformTextProps = {
    readonly children?: ReactNode;
    readonly includeProps?: string[];
};

const transformToText = ({ children, includeProps }: TransformTextProps) => {
    const convertReactMeanToString = (child: any): Array<null | string> => {
        const parts: Array<null | string> = [];

        if (typeof child !== "object")
        {
            parts.push(child.toString());

            return parts;
        }

        if (child instanceof React.Fragment || child.props?.children)
        {
            parts.push(...convertReactMeanToString(child));
        }

        if (Array.isArray(includeProps) && child?.props) {
            for (const includeProp of includeProps) {
                if (typeof child.props[includeProp] !== 'undefined') {
                    parts.push(child.props[includeProp]);
                }
            }
        }

        return parts;
    };

    return React.Children.map(children, convertReactMeanToString)?.join('\n') ?? '';
}

export default transformToText;
