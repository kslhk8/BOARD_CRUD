"use client"
import Link from "next/link"
import { timeFromToday } from "~/helper/dateFormat"
import useGetItems, { BoardItemType } from "~/queries/useGetItems"
import { BOARD_PATH_CONST } from "~/constants/pathConst"

const Boards: React.FC = () => {
  const { data: boardListData } = useGetItems()
  return (
    <div className="">
      <div className="list-container" key={1}>
        <Link href={BOARD_PATH_CONST.BOARD_ADD} className="board-add-btn">
          등록
        </Link>
        {boardListData.length ? (
          <ul>
            {boardListData?.map((boardItem: BoardItemType, idx: number) => (
              <Link
                href={BOARD_PATH_CONST.BOARD_DETAIL(boardItem.id)}
                key={`board-list-${boardItem.id}`}
                className="content-wrapper"
              >
                <li className="content">
                  {boardItem.title}
                  <span>{timeFromToday(boardItem.date)}</span>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <div className="no-data">게시글이 없습니다.</div>
        )}
      </div>
      ) :
    </div>
  )
}
export default Boards
