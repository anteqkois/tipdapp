# SLITHER 
slither --solc-remaps @openzeppelin/=/home/anteqkois/project/tipdapp/contracts/node_modules/@openzeppelin/ contracts/Qoistip/Qoistip.sol
# MYTHRIL 
myth analyze --solc-json contracts/remapingss.json contracts/Qoistip/Qoistip.sol:Qoistip

# generate dev/user doc
solc --userdoc --devdoc @openzeppelin/=/home/anteqkois/project/tipdapp/contracts/node_modules/@openzeppelin/ contracts/QoistipSign/QoistipSign.sol 
solc --userdoc @openzeppelin/=/home/anteqkois/project/tipdapp/contracts/node_modules/@openzeppelin/ contracts/QoistipSign/QoistipSign.sol > doc.json