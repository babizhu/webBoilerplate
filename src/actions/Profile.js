/**
 * Created by liu_k on 2016/3/29.
 */

export const EDIT_NAME = 'EDIT_NAME';

export function editName( name ){

    return{
        type:EDIT_NAME,
        name
    }
}
