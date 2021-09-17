import { createContext, useContext, useReducer } from "react";

const init = {
    aside: true,
    asideElement: null,
    containerElement: null,
    initAside: function (asideElement, containerElement) {
        if (asideElement.current) {
            asideElement.current.style.left = "0px";
        }
        if (containerElement.current) {
            containerElement.current.style.marginLeft = "400px";
        }
    },
    showAside: function () {
        this.asideElement.current.style.animation = "aside-show 0.5s ease";
        this.asideElement.current.style.left = "0px";
        this.containerElement.current.style.animation = "container-minimum 0.5s ease"
        this.containerElement.current.style.marginLeft = "400px"
    },
    hideAside: function () {
        this.asideElement.current.style.animation = "aside-hide 0.5s ease";
        this.asideElement.current.style.left = "-400px";
        this.containerElement.current.style.animation = "container-maximum 0.5s ease"
        this.containerElement.current.style.marginLeft = "0px"
    },
    groupListShowStyles: {
        animation: "groups-show 0.5s ease",
        visibility: "visible",
        height: '55vh',
        padding: '10px',
        margin: '2px 0',
        display: 'flex'
    },
    groupListHideStyles: {
        animation: "groups-hide 0.5s ease",
        visibility: "hidden",
        height: '0vh',
        padding: '0px',
        margin: '0px 0',
        display: 'none'
    },
    groupList: false,
    groupListElement: null,
    groupAppendElement: null,
    initGroupList: function (auth, groupListElement, groupAppendElement) {
        const { animation, visibility, height, padding, margin, display } = auth === null ? this.groupListHideStyles : this.groupListShowStyles;
        if (groupListElement.current) {
            groupListElement.current.style.animation = animation;
            groupListElement.current.style.visibility = visibility;
            groupListElement.current.style.height = height;
            groupListElement.current.style.padding = padding;
            groupListElement.current.style.margin = margin;
        }
        if (groupAppendElement.current) {
            groupAppendElement.current.style.display = display;
        }
    },
    showGroupList: function () {
        if (this.groupListElement.current && this.groupAppendElement.current) {
            const { animation, visibility, height, padding, margin, display } = this.groupListShowStyles;
            this.groupListElement.current.style.animation = animation;
            this.groupListElement.current.style.visibility = visibility;
            this.groupListElement.current.style.height = height;
            this.groupListElement.current.style.padding = padding;
            this.groupListElement.current.style.margin = margin;
            this.groupAppendElement.current.style.display = display;
        }
    },
    hideGroupList: function () {
        if (this.groupListElement.current && this.groupAppendElement.current) {
            const { animation, visibility, height, padding, margin, display } = this.groupListHideStyles;
            this.groupListElement.current.style.animation = animation;
            this.groupListElement.current.style.visibility = visibility;
            this.groupListElement.current.style.height = height;
            this.groupListElement.current.style.padding = padding;
            this.groupListElement.current.style.margin = margin;
            this.groupAppendElement.current.style.display = display;
        }
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case "init_aside":
            const { asideElement, containerElement } = action;
            state.initAside(asideElement, containerElement);
            return { ...state, asideElement, containerElement };

        case "aside_trigger":
            if (state.aside) state.hideAside();
            else state.showAside();
            return { ...state, aside: !state.aside };

        case "show_aside":
            state.showAside();
            return { ...state, aside: true };

        case "hide_aside":
            state.hideAside();
            return { ...state, aside: false };

        case "init_groupList":
            const { auth, groupListElement, groupAppendElement } = action;
            const groupList = auth === null ? false : true;
            state.initGroupList(auth, groupListElement, groupAppendElement);
            return { ...state, groupList, groupListElement, groupAppendElement };

        case "show_groupList":
            state.showGroupList();
            return { ...state, groupList: true }

        case "hide_groupList":
            state.hideGroupList();
            return { ...state, groupList: false }

        default:
            return state;
    }
};

const context = createContext();
const dispatcher = createContext();

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, init);

    return (
        <context.Provider value={state}>
            <dispatcher.Provider value={dispatch}>
                {children}
            </dispatcher.Provider>
        </context.Provider>
    );
};

export const useAppState = () => {
    return useContext(context);
};

export const useAppDispatch = () => {
    return useContext(dispatcher);
};