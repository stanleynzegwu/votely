// export interface Election_S {
//     candidates_length: bigint,
//     election_state:bigint ,
//     calculate_votes: {0: bigint, 1: bigint}[]
// }

export interface Election_S {
    candidates_length: bigint,
    election_state: bigint,
    calculate_votes: {0: bigint, 1: bigint}[],
    election_id: bigint,
}