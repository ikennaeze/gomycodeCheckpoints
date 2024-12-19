import React from 'react';

function DMsButton({ friend, isActive, onButtonClick, isFriendsListOpen }) {
  return (
    <button
      onClick={() => {onButtonClick(friend.username)}}
      className={`${
        isActive && !isFriendsListOpen
          ? 'bg-[#243b72] text-[#98ebfa]' // Active button style
          : 'hover:bg-[#192d5a] text-[#5da0ac]' // Inactive button style
      } flex items-center duration-300 w-full py-3 font-medium rounded-xl indent-3`}
    >
      <img src={friend.userPfp} className="w-10 h-10 rounded-full ml-3" />
      <p>{friend.username}</p>
    </button>
  );
}

export default DMsButton;
