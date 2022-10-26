import { useEffect, useState } from "react";
import { boardService } from "../store";
import { BoardType } from "../types";
import { BoardConst, MineUtils } from "../utils";

interface ExtendedBoardType extends BoardType {
    mines: number;
}

export const useBoard = () => {
  const [board, setBoard] = useState<ExtendedBoardType>({
    width: BoardConst.Width,
    height: BoardConst.Height,
    mineRatio: BoardConst.Ratio,
    mines: MineUtils.totalMines( BoardConst.Width, BoardConst.Height, BoardConst.Ratio),
  });

  useEffect(() => {
    const subscription = boardService.onUpdate().subscribe((state) => {
      console.log(state);

      setBoard({ ...board, ...(state as Partial<BoardType>) });
    });

    return () => subscription.unsubscribe();
  }, []);
  
  return { ...board, setBoard };
};