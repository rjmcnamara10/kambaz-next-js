import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";

export default function GroupControlButtons() {
  return (
    <div className="float-end">
      <BsPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
