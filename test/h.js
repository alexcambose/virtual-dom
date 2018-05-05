import { assert } from "chai";
import { h } from "../src/index";

describe("h", () => {
    it("text children", () => {
        const content = h(
            "div",
            null,
            h("h1", { className: "title" }, "Page title"),
            "content..."
        );
        assert.deepEqual(content, {
            type: "div",
            props: {
                children: [
                    {
                        type: "h1",
                        props: {
                            className: "title",
                            children: ["Page title"]
                        }
                    },
                    "content..."
                ]
            }
        });
    });
    it("function", () => {
        const element = () => h("h1", { className: "title" }, "Page title");
        const content = h(
            "div",
            null,
            h(element, null),
            "content..."
        );
        assert.deepEqual(content, {
            type: "div",
            props: {
                children: [
                    {
                        type: "h1",
                        props: {
                            className: "title",
                            children: ["Page title"]
                        }
                    },
                    "content..."
                ]
            }
        });
    });
    it("function props and children", () => {
        const element = ({ id, children }) => h("h1", { className: "title", id }, ...children);
        const content = h(
            "div",
            null,
            h(element, { id: 'titleid' }, "Page title"),
            "content..."
        );
        assert.deepEqual(content, {
            type: "div",
            props: {
                children: [
                    {
                        type: "h1",
                        props: {
                            className: "title",
                            id: 'titleid',
                            children: ["Page title"]
                        }
                    },
                    "content..."
                ]
            }
        });
    });
});
