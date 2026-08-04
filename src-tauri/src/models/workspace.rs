use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type, Debug, Clone, PartialEq)]
pub struct Workspace {
    id: u32,
    name: String,
    icon_id: Option<String>,
    filter_query: String,
}
