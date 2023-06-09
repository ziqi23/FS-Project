import { csrfFetch } from "./csrf";
import { storeCSRFToken } from "./csrf";

const SHOWALLTEAMS = 'team/SHOWALLTEAMS';
const CREATETEAM = "team/CREATETEAM";
const UPDATETEAM = "team/UPDATETEAM";
const REMOVETEAM = "team/REMOVETEAM";

const showAllTeams = (teams) => (
    {
        "type": SHOWALLTEAMS,
        teams
    }
)

const createTeam = (team) => (
    {
        "type": CREATETEAM,
        team
    }
)

const removeTeam = (teamId) => (
    {
        "type": REMOVETEAM,
        teamId
    }
)

const updateTeam = (team) => (
    {
        "type": UPDATETEAM,
        team
    }
)

export const showAll = (arg) => async (dispatch) => {
    let res;
    if (arg === "All") {
        res = csrfFetch("/api/teams?all=true")
        return res;
    } else {
        res = await csrfFetch("/api/teams")
    }
    const data = await res.json()
    dispatch(showAllTeams(data))
}

export const addTeam = (team) => async (dispatch) => {
    const res = await csrfFetch("/api/teams", {
        method: "POST",
        body: JSON.stringify({
            team
        })
    })
    const data = await res.json();
    dispatch(createTeam(data));
}

export const addUserToTeam = (teamId) => async (dispatch) => {
    const res = await csrfFetch(`/api/teams/${teamId}`, {
        method: "PATCH"
    })
    const data = await res.json()
    dispatch(showAllTeams(data))
}

export const leaveTeam = (teamId) => async (dispatch) => {
    const res = await csrfFetch(`/api/teams/${teamId}/leave`, {
        method: "PATCH"
    })
    const data = await res.json()
    dispatch(showAllTeams(data))
}

export const modifyTeam = (team) => async(dispatch) => {
    const res = await csrfFetch(`/api/teams/${team.id}`, {
        method: "PATCH",
        body: JSON.stringify({
            team
        })
    })
    dispatch(updateTeam(team))
}

export const deleteTeam = ({teamId}) => async(dispatch) => {
    const res = await csrfFetch(`/api/teams/${teamId}`, {
        method: "DELETE",
    })
    dispatch(removeTeam(teamId))
}

export const showAssociatedPages = (teamId) => async(dispatch) => {
    const res = await csrfFetch(`api/pages?team=${teamId}`)
    const data = await res.json()
    return data
}

let initialState = {};

const teamReducer = (state=initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case (SHOWALLTEAMS):
            return ({...action.teams})
        case (CREATETEAM):
            return ({ ...state, [action.team.id]: action.team }); 
            // return action.payload;
        case (UPDATETEAM):
            return ({ ...state, [action.team.id]: { ...state[action.team.id], ...action.team }});
            // newState = {};
            // return newState;
        case (REMOVETEAM):
            delete newState[action.teamId]
            return newState;
        default:
            return state;
    }
}

export default teamReducer;