import { get_all_games } from '../../store/actions/get_games'
import { connect } from 'react-redux';
import { useEffect } from 'react'


function Getting_all_games ({games, get_all_games}) {
    useEffect(() => {get_all_games();})
    
    return (
        <div>
          {console.log('this is games: ', games)
            //   this.state.map(el =>{
            //       return (
            //           <div>
            //               el.name
            //           </div>
            //       )
            //   })
          }  
        </div>
    )
   

}

function mapStateToProps(state) {
    return {
        games: state.games_all
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        get_all_games: () => dispatch(get_all_games())
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Getting_all_games);