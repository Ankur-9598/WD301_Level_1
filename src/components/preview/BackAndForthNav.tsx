import React from "react";

interface BackAndForthNavProps {
    activeIndex: number;
    total: number;
    updateActiveIndexCB: (index: number) => void;
}

export default function BackAndForthNav(props: BackAndForthNavProps) {
    const { activeIndex, total, updateActiveIndexCB } = props;

    // Get the next active index
    const _nextField = () => {
        let currentIndex = activeIndex;
        currentIndex = currentIndex >= total - 2 ? total - 1 : currentIndex + 1;
        updateActiveIndexCB(currentIndex);
    }

    // Get the previous active index
    const _prevField = () => {
        let currentIndex = activeIndex;
        currentIndex = currentIndex <= 1 ? 0 : currentIndex - 1;
        updateActiveIndexCB(currentIndex);
    }

    // Get the next button
    const _nextButton = () => {
        if(activeIndex < total - 1) {
            return (
                <button 
                    type="button" 
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-6 rounded focus:shadow-outline" 
                    onClick={_nextField}
                >
                    Next
                </button>
            );
        }
        return null;
    }

    // Get the previous button
    const _previousButton = () => {
        if(activeIndex > 0) {
            return (
                <button 
                    type="button" 
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-4 rounded focus:shadow-outline" 
                    onClick={_prevField}
                >
                    Previous
                </button>
            );
        }
        return null;
    }


    return (
        <div className="flex justify-evenly mt-4">
            {_previousButton()}
            {_nextButton()}
        </div>
    )
}