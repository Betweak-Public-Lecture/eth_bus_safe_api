pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract bus_safe {
    uint32 check_count;

    event AddCheck(
        address checker,
        string car_id,
        string check_res,
        string check_etc,
        uint64 check_time
    );

    struct check_list {
        address checker;
        string car_id;
        string check_res;
        string check_etc;
        uint64 check_time;
    }

    check_list[] public checks;

    // CheckList(점검표) 추가
    function AddCheckList(
        string memory _car_id,
        string memory _check_res,
        string memory _check_etc,
        uint64 _check_time
    ) public {
        address _checker = msg.sender;
        checks.push(
            check_list(_checker, _car_id, _check_res, _check_etc, _check_time)
        );
        check_count++;
        emit AddCheck(_checker, _car_id, _check_res, _check_etc, _check_time);
    }

    // CheckList(점검표) 총 개수
    function TotalCount() public view returns (uint32) {
        return check_count;
    }

    // 단일 CheckList 별로 상세조회
    // uint32  unsignedInteger(부호없는 정수) 32bit   ==> 2^32 [0 ~ 2^32-1]
    // uint256 unsignedInteger(부호없는 정수) 256bit  ==> 2^256 [0 ~ 2^256 -1]
    //
    function GetCheck(uint32 _index)
        public
        view
        returns (
            address,
            string memory,
            string memory,
            string memory,
            uint64
        )
    {
        return (
            checks[_index].checker,
            checks[_index].car_id,
            checks[_index].check_res,
            checks[_index].check_etc,
            checks[_index].check_time
        );
    }

    function GetCheckAll() public view returns (check_list[] memory) {
        return checks;
    }
}
