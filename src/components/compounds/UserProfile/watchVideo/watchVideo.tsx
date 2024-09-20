import { WatchIcon } from "@/components/atomics/Icon";
import { useModalStore } from "@/zustand/modalStore/modalStore";
import { WatchIconContent } from "./watchIconContent";
import { CustomModal } from "@/hooks/useModal";
import { useEffect } from "react";

interface WatchIconProps{
    mobilesize?:number; 
    size?:number;
}
export const WatchVideoIconWithModal = ({mobilesize, size}:WatchIconProps) => {
    const { openModal,setUniqueModal } = useModalStore();
    const contentArray = [
        <WatchIconContent /> 
    ];
    const onClickWatchIcon = () => {
        setUniqueModal("Video")
        openModal(contentArray, 0);
    };

    return (
        <WatchIcon mobilesize={mobilesize} size={size} onClick={onClickWatchIcon}/> 
    );
};
